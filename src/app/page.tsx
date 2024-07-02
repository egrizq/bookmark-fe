'use client'

import { useState, useEffect } from "react";
import { Title } from "./components/dashboard/title";
import CheckUserExist from "./components/dashboard/checkUserExistAndLogout";
import { FormInput } from "./form";
import ListBookmarkByCategory from "./components/dashboard/getListCategory";
import { z } from "zod";

export default function Main() {
    const [username, setUsername] = useState<string>('')
    const [status, setStatus] = useState<boolean>(false)

    const schemaResponse = z.object({
        StatusCode: z.number(),
        Message: z.string()
    })

    useEffect(() => {
        fetch("http://localhost:8000/page", {
            method: "GET",
            credentials: "include",
        })
            .then((res) => {
                if (res.ok) {
                    const user = res.json()
                    return user
                } else if (!res.ok) {
                    throw new Error("Please login to save your Bookmark")
                }
            })
            .then((user) => {
                const res = schemaResponse.parse(user)
                setUsername(res.Message)
                setStatus(true)
            })
            .catch((error) => {
                if (error instanceof Error) {
                    console.log(error.message)
                }
            })
    }, [])

    return (
        <>
            <nav className="border-b border-zinc-200 bg-white mx-auto w-full p-3 shadow-md z-50 fixed">
                <div className="flex mx-auto justify-between w-9/12">
                    <p className="text-xl font-bold py-1 text-zinc-800">Bookmark-ku</p>
                    <CheckUserExist username={username!} />
                </div>
            </nav>

            <main className="container mx-auto pt-36 pb-10 text-zinc-800">
                <div className="flex justify-center">
                    <div className="flex flex-col w-6/12 ">

                        <Title />

                        <FormInput status={status} />

                        <ListBookmarkByCategory
                            status={status}
                            username={username}
                        />
                    </div>
                </div>
            </main>
        </>
    )
}