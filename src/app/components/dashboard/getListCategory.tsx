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
                className="border-b-1 border-zinc-300 w-10/12 hover:scale-105 duration-100">
                <div className="flex flex-row m-2 justify-between items-center">
                    <p className="font-semibold text-xl">{CategoryName.replaceAll("_", " ")}</p>
                    <p className="text-sm">{Number} Item</p>
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
                <div className="flex flex-col py-4 mx-4">
                    <p className="text-2xl font-bold pb-5">List Bookmark-ku</p>

                    <div className="flex flex-col items-center space-y-5">
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