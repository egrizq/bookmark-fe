import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import { useRouter } from "next/navigation";
import { LogoutButton } from "./logout";

const CheckUserExist = ({ username }: { username: string }) => {
    const router = useRouter();

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
                            <LogoutButton />
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