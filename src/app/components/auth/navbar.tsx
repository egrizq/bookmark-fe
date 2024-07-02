"use client"

import { useRouter } from "next/navigation";

const NavBar = () => {
    const router = useRouter()

    return (
        <>
            <nav className="border-b border-zinc-200 mx-auto w-full p-3 shadow-md z-50 fixed bg-white">
                <div className="flex mx-auto justify-between w-9/12">
                    <button
                        onClick={() => router.push("/")}
                        className="text-xl font-bold py-1 text-zinc-800">
                        Bookmark-ku
                    </button>
                </div>
            </nav>
        </>
    )
}

export default NavBar;