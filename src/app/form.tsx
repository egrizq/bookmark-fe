"use client"

import { useEffect, useState } from "react"
import ButtonStatus from "./components/dashboard/buttonSubmit"
import SelectSocialMedia from "./components/dashboard/selectSocialMedia"
import { response, requestBookmarks } from "./auth/definitions"
import { InstagramEmbed, YouTubeEmbed, TikTokEmbed } from "react-social-media-embed"
import { Spotify } from "react-spotify-embed"
import { TweetPage } from "./components/dashboard/configSocialMedia"
import { ErrorLink } from "./components/dashboard/text"
import { SelectCatergory } from "./components/dashboard/selectCategory"
import Youtube from "./components/youtube"

interface statusForm {
    status: boolean;
}

interface typeCategory {
    link: string[];
    media: JSX.Element;
}

export const FormInput = ({ status }: statusForm) => {
    const [sosmed, setSosmed] = useState('tw')
    const [url, setUrl] = useState('')
    const [category, setCategory] = useState('#')
    const [returnedSosmed, setReturnedSosmed] = useState<JSX.Element>()

    let sosmedMap: Map<string, typeCategory> = new Map()

    sosmedMap.set("tw", {
        link: ["twitter.com", "x.com"],
        media: <TweetPage url={url} />
    })
    sosmedMap.set("sp", {
        link: ["open.spotify.com"],
        media: <Spotify link={url} />
    })
    sosmedMap.set("yt", {
        link: ["youtube.com", "youtu.be"],
        media: <Youtube url={url} />
    })

    useEffect(() => {
        let err = <ErrorLink />

        if (url.includes("https://")) {
            let sosmedKey = sosmedMap.get(sosmed)
            let check = sosmedKey?.link.some(domain => url.includes(domain))
            if (check) {
                setReturnedSosmed(sosmedKey?.media)
            } else {
                setReturnedSosmed(err)
            }
        } else {
            setReturnedSosmed(err)
        }

    }, [url, sosmed])

    const onSubmit = async () => {
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
                const errorData: response = await response.json()
                throw new Error(JSON.stringify(errorData))
            }
        } catch (error) {
            const errorMessage = (JSON.parse((error as Error).message) as response).Message;
            alert(errorMessage)
        }
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <div className="flex flex-row justify-center drop-shadow-xl pt-12">
                    <SelectSocialMedia
                        id="social"
                        setValue={(e: any) => setSosmed(e.target.value)}
                    />

                    <input type="text"
                        className="border-t border-l border-b border-zinc-800 py-1 px-2 w-7/12"
                        placeholder="Link"
                        onChange={(e) => setUrl(e.target.value)}
                    />

                    <ButtonStatus
                        url={url}
                        status={status}
                        category={category}
                    />
                </div>
            </form>

            <SelectCatergory
                status={status}
                setValue={(e) => setCategory(e.target.value)}
            />

            <div className="flex justify-center py-5">
                {returnedSosmed}
            </div>
        </>
    )
}