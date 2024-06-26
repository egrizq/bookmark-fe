"use client"

import { TweetPage } from "@/app/components/dashboard/configSocialMedia";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { InstagramEmbed, YouTubeEmbed, TikTokEmbed } from "react-social-media-embed";
import { Spotify } from "react-spotify-embed";

interface typeData {
    username: string
    category: string
}

interface typeMedia {
    media: string
    url: string
}

const GetBookmarksByCategory = ({ username, category }: typeData) => {
    const [url, setUrl] = useState<string[]>([])
    console.log(category, username)

    useEffect(() => {
        fetch(`http://localhost:8000/bookmark/get/${username}/${category}`, {
            method: "GET",
            credentials: "include"
        })
            .then((res) => {
                if (res.ok) {
                    const message = res.json()
                    return message
                }
            })
            .then((message) => {
                setUrl(message.Message)
                console.log(message.Message)
            })
            .catch((e) => {
                // pass
                console.log(e)
            })
    }, [])

    const ShowMedia = ({ url, media }: typeMedia) => {
        interface typeCategory {
            media: JSX.Element;
        }
        let sosmedMap: Map<string, typeCategory> = new Map()

        sosmedMap.set("tw", {
            media: <TweetPage url={url} />
        })
        sosmedMap.set("sp", {
            media: <Spotify link={url} />
        })
        sosmedMap.set("ig", {
            media: <InstagramEmbed url={url} />
        })
        sosmedMap.set("yt", {
            media: <YouTubeEmbed url={url} />
        })
        sosmedMap.set("tt", {
            media: <TikTokEmbed url={url} />
        })

        const selectedMedia = sosmedMap.get(media);

        return (
            <>
                {selectedMedia?.media}
            </>
        );

    }

    return (
        <>
            <div className="flex flex-col items-center pt-5 w-full">
                {url.map((data: any) => (
                    <ShowMedia
                        key={data.Url}
                        url={data.Url}
                        media={data.Social} />
                ))}
            </div>
        </>
    )
}

export const TitleBookmarks = ({ category }: { category: string }) => {
    const router = useRouter()

    return (
        <>
            <div className="flex justify-between align-items">
                <p className="text-2xl font-bold">{category}</p>

                <button onClick={() => router.push("/")}
                    className="border border-zinc-300 py-1 px-2 rounded-md hover:bg-zinc-200">
                    Kembali
                </button>
            </div>
        </>
    )
}

export default GetBookmarksByCategory;