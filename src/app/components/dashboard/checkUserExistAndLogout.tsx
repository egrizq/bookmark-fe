import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CheckUserExist = ({ username }: { username: string }) => {
    const router = useRouter();
    const [status, setStatus] = useState<boolean>(false)

    const handleLogout = async () => {
        try {
            const res = await fetch("http://localhost:8000/bookmark/logout", {
                method: "GET",
                credentials: "include",
            });

            if (!res.ok) {
                const errorMessage = await res.json();
                throw new Error(errorMessage);
            }
        } catch (err: any) {
            alert(err.Message);
        }
    };

    useEffect(() => {
        if (status) {
            handleLogout()
            router.push("/login")
        }
    }, [status])

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
                            <button onClick={() => setStatus(!status)}>
                                Log Out
                            </button>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </>
        )
    }

    return (
        <button onClick={() => router.push("/login")}
            className="text-lg text-white font-medium px-3 border bg-zinc-800 hover:bg-zinc-900 border-zinc-800 rounded-lg">
            Log in
        </button>
    )
}

export default CheckUserExist;