'use client'

import { useState, useEffect } from "react";
import { response } from "./auth/definitions";
import { Title } from "./components/dashboard/text";
import CheckUserExist from "./components/dashboard/checkUserExist";
import { FormInput } from "./form";

export default function Main() {
    const [username, setUsername] = useState<string>('')
    const [status, setStatus] = useState<boolean>(false)

    useEffect(() => {
        const checkUser = async () => {
            try {
                const response = await fetch("http://localhost:8000/page/main", {
                    method: "GET",
                    credentials: "include",
                })
                if (response.ok) {
                    const res: response = await response.json()
                    const { Message } = res

                    setUsername(Message)
                    setStatus(true)
                }
            } catch (error) {
                // pass
            }
        }

        checkUser();
    }, [])

    return (
        <>
            <nav className="border-b border-zinc-200 mx-auto w-full p-3 shadow-md">
                <div className="flex mx-auto justify-between w-9/12">
                    <p className="text-xl font-bold py-1 text-zinc-800">Bookmark-ku</p>
                    <CheckUserExist username={username!} />
                </div>
            </nav>

            <main className="container mx-auto pt-20 text-zinc-800">
                <div className="flex justify-center">
                    <div className="flex flex-col w-6/12">

                        <Title />

                        <FormInput
                            username={username}
                            status={status}
                        />

                    </div>
                </div>
            </main>
        </>
    )
}