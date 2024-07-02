import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { z } from "zod"

interface typeBoxBookmarks {
    CategoryName: string
    Number: number
    Username?: string
}

const BoxBookmarks = ({ CategoryName, Number, Username }: typeBoxBookmarks) => {
    const router = useRouter()

    return (
        <>
            <button onClick={() => router.push(`/${Username}/${CategoryName}`)}
                className="border-b border-zinc-300 w-10/12 hover:bg-zinc-100">
                <div className="flex flex-row m-2 justify-between items-center ">
                    <div className="flex flex-row">
                        <img src="/folder2.svg" width={25} className="pr-2" />
                        <p className="font-semibold text-xl">{CategoryName.replaceAll("_", " ")}</p>
                    </div>
                    <p className="text-sm">01 Jul 2024</p>
                </div>
            </button>
        </>
    )
}

const ListBookmarkByCategory = ({ status, username }: { status: boolean, username: string }) => {
    const [category, setCategory] = useState<typeBoxBookmarks[]>([])

    const schemaResponse = z.object({
        StatusCode: z.number(),
        Message: z.array(z.object({
            CategoryName: z.string(),
            Number: z.number()
        }))
    })

    useEffect(() => {
        fetch("http://localhost:8000/bookmark/list", {
            method: "GET",
            credentials: "include",
        })
            .then((res) => {
                if (res.ok) {
                    const data = res.json()
                    return data
                }
            })
            .then((data) => {
                const res = schemaResponse.parse(data)
                setCategory(res.Message)
            })
            .catch((e) => {
                // pass
            })
    }, [])

    if (status && category.length !== 0) {
        return (
            <>
                <div className="flex flex-col py-4 mx-5">
                    <div className="flex flex-col items-center">

                        <div className="flex flex-row px-2 py-1 justify-between items-center border-b w-10/12">
                            <p className="font-sm">Nama</p>
                            <p className="text-sm">Terakhir Update</p>
                        </div>

                        {category.map((bookmark, index) => (
                            <BoxBookmarks
                                key={index}
                                Username={username}
                                CategoryName={bookmark.CategoryName}
                                Number={bookmark.Number}
                            />
                        ))}
                    </div>
                </div>
            </>
        )
    }

    return null
}

export default ListBookmarkByCategory