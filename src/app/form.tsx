"use client"

import { useEffect, useState } from "react"
import ButtonStatus from "./components/dashboard/button"
import SelectSocialMedia from "./components/dashboard/selectSocialMedia"
import { requestBookmarks } from "./type/definitions"
import { TweetEmbed } from "./components/socialMedia/twitter"
import { SelectCatergory } from "./components/dashboard/selectCategory"
import YoutubeEmbed from "./components/socialMedia/youtube"
import SpotifyEmbed from "./components/socialMedia/spotify"
import { Warning } from "./components/dashboard/warning"
import { z } from "zod"

interface statusForm {
    status: boolean;
}

interface typeCategory {
    link: string[];
    media: JSX.Element;
}

const schemaResponse = z.object({
    StatusCode: z.number(),
    Message: z.string()
})

export const FormInput = ({ status }: statusForm) => {
    const [sosmed, setSosmed] = useState('tw')
    const [url, setUrl] = useState('')
    const [category, setCategory] = useState('#')
    const [returnedSosmed, setReturnedSosmed] = useState<JSX.Element>()
    const [isSubmit, setIsSubmit] = useState(false)

    let sosmedMap: Map<string, typeCategory> = new Map()

    sosmedMap.set("tw", {
        link: ["twitter.com", "x.com"],
        media: <TweetEmbed url={url} />
    })
    sosmedMap.set("sp", {
        link: ["open.spotify.com"],
        media: <SpotifyEmbed url={url} />
    })
    sosmedMap.set("yt", {
        link: ["youtube.com", "youtu.be"],
        media: <YoutubeEmbed url={url} />
    })

    useEffect(() => {
        const err = <Warning />;

        if (url.includes("https://")) {
            const sosmedKey = sosmedMap.get(sosmed);
            const isValidDomain = sosmedKey?.link.some(domain => url.includes(domain));

            setIsSubmit(isValidDomain!)
            setReturnedSosmed(isValidDomain ? sosmedKey?.media : err);
        } else {
            setReturnedSosmed(err);
        }

    }, [url, sosmed])



    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const responseData: requestBookmarks = {
            social: sosmed,
            url: url,
            category: category
        }

        try {
            const response = await fetch("http://localhost:8000/bookmark/insert", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(responseData),
                credentials: "include"
            })

            if (!response.ok) {
                return response.json()
            }

            location.reload()
        } catch (error) {
            const errorMessage = schemaResponse.parse(error)
            alert(errorMessage.Message)
        }
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <div className="flex flex-row justify-center drop-shadow-xl pt-10">
                    <SelectSocialMedia
                        id="social"
                        setValue={(e: any) => setSosmed(e.target.value)}
                    />

                    <input
                        type="text"
                        className="border-t border-l border-b border-zinc-800 py-1 px-2 w-7/12"
                        placeholder="Link"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />

                    <ButtonStatus
                        url={url}
                        status={isSubmit}
                        category={category}
                    />
                </div>
            </form>

            <SelectCatergory
                status={status}
                setValue={(e) => setCategory(e.target.value)}
            />

            <div className="flex justify-center">
                {returnedSosmed}
            </div>
        </>
    )
}