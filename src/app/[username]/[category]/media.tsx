"use client"

import DeleteBookmarks from "@/app/components/media/deleteBookmarks";
import SpotifyEmbed from "@/app/components/socialMedia/spotify";
import { TweetEmbed } from "@/app/components/socialMedia/twitter";
import Youtube from "@/app/components/socialMedia/youtube";
import { useEffect, useState } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";

interface typeData {
    username: string
    category: string
}

interface typeMedia {
    media: string
    url: string
}

interface typeResponseBookmarks {
    Id: string
    Url: string
    Social: string
}

const schemaResponse = z.object({
    Message: z.array(z.object({
        Id: z.string(),
        Url: z.string(),
        Social: z.string()
    })),
    StatusCode: z.number()
})

const ShowMedia = ({ url, media }: typeMedia) => {
    interface typeCategory {
        media: JSX.Element;
    }
    let sosmedMap: Map<string, typeCategory> = new Map()

    sosmedMap.set("tw", {
        media: <TweetEmbed url={url} />
    })
    sosmedMap.set("sp", {
        media: <SpotifyEmbed url={url} />
    })
    sosmedMap.set("yt", {
        media: <Youtube url={url} />
    })

    const selectedMedia = sosmedMap.get(media);

    return (
        <>
            {selectedMedia?.media}
        </>
    );
}

const GetBookmarksByCategory = ({ username, category }: typeData) => {
    const [bookmark, setBookmark] = useState<typeResponseBookmarks[]>([])

    useEffect(() => {
        fetch(`http://localhost:8000/get/${username}/${category}`, {
            method: "GET",
            credentials: "include"
        })
            .then((res) => {
                if (res.ok) {
                    return res.json()
                }
            })
            .then((data) => {
                const { Message } = schemaResponse.parse(data)
                setBookmark(Message)
            })
            .catch((e) => {
                // pass
            })
    }, [])

    return (
        <>
            <div className="flex flex-col items-center w-full">
                {bookmark.map((data) => (
                    <div key={data.Id}
                        className="flex flex-row justify-between space-x-2 w-full">
                        <ShowMedia
                            key={data.Id}
                            url={data.Url}
                            media={data.Social}
                        />

                        <div className="pt-7">
                            <DeleteBookmarks
                                id={data.Id}
                                username={username}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export const NavBarMedia = ({ username }: { username: string }) => {
    const router = useRouter()

    return (
        <>
            <nav className="border-b border-zinc-200 mx-auto w-full p-3 shadow-md z-50 fixed bg-white">
                <div className="flex mx-auto justify-between w-9/12">
                    <button
                        onClick={() => router.push("/")}
                        className="text-xl font-bold py-1 text-zinc-800">
                        <img src="/back.svg" width={25} />
                    </button>

                    <p className="text-xl font-bold py-1 text-zinc-800">
                        {username}
                    </p>
                </div>
            </nav>
        </>
    )
}

export default GetBookmarksByCategory;