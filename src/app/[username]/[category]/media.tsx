"use client"

import DeleteBookmarks from "@/app/components/media/deleteBookmarks";
import SpotifyEmbed from "@/app/components/socialMedia/spotify";
import { TweetEmbed } from "@/app/components/socialMedia/twitter";
import Youtube from "@/app/components/socialMedia/youtube";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { z } from "zod";

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

const schemaError = z.object({
    StatusCode: z.number(),
    Message: z.string()
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
            <div className="flex flex-col items-center pt-5 w-full">
                {bookmark.map((data) => (
                    <div key={data.Id}
                        className="flex flex-row justify-center space-x-2 w-full align-items">
                        <ShowMedia
                            key={data.Id}
                            url={data.Url}
                            media={data.Social} />

                        <div className="pt-5">
                            <Dropdown>
                                <DropdownTrigger>
                                    <button className="text-xl font-bold  text-zinc-800">
                                        <img src="/ellipsi.svg" width={25} />
                                    </button>
                                </DropdownTrigger>

                                <DropdownMenu aria-label="Static Actions">
                                    <DropdownItem textValue="delete">
                                        <DeleteBookmarks id={data.Id} username={username} />
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    </div>
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
                <p className="text-4xl font-bold">{category.replaceAll("_", " ")}</p>

                <button onClick={() => router.push("/")}
                    className="border border-zinc-300 py-1 px-2 rounded-md hover:bg-zinc-200">
                    Kembali
                </button>
            </div>

            <div className="pt-2 text-medium">
                <p className="italic">Edit deskripsi disini</p>
            </div>
        </>
    )
}

export default GetBookmarksByCategory;