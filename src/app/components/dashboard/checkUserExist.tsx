import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { response } from "@/app/auth/definitions";

const CheckUserExist = ({ username }: { username: string }) => {
    const router = useRouter();
    const [status, setStatus] = useState<boolean>()

    const handleLogout = async () => {
        try {
            const response = await fetch("http://localhost:8000/logout", {
                method: "POST",
                credentials: "include",
            })
            const data: response = await response.json()
            const { Message } = data

            if (response.ok) {
                console.log(Message)
            } else {
                throw new Error(Message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (status) {
            handleLogout()
            router.push("/login")
        }

    }, [status, setStatus])


    if (username?.length >= 8) {
        return (
            <>
                <Dropdown>
                    <DropdownTrigger>
                        <button className="text-xl font-bold py-1 text-zinc-800">
                            {username}
                        </button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions">
                        <DropdownItem textValue="pf">Profile</DropdownItem>
                        <DropdownItem textValue="logout">
                            <button
                                onClick={() => setStatus(true)}>
                                Log Out
                            </button>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </>
        )
    }

    if (status) {
        router.refresh()
    }

    return (
        <button onClick={() => router.push("/login")}
            className="text-lg text-white font-medium py-1 px-3 border bg-zinc-800 hover:bg-zinc-900 border-zinc-800 rounded-lg">
            Log in
        </button>
    )
}

export default CheckUserExist;