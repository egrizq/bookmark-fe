import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

const ListBookmarkByCategory = ({ status, username }: { status: boolean, username: string }) => {
    interface typeBoxBookmarks {
        CategoryName: string
        Number: number
    }
    const [category, setCategory] = useState<typeBoxBookmarks[]>([])

    useEffect(() => {
        fetch("http://localhost:8000/bookmark/list", {
            method: "GET",
            credentials: "include",
        })
            .then((res) => {
                if (res.ok) {
                    const user = res.json()
                    return user
                }
            })
            .then((category) => {
                setCategory(category.Message)
            })
            .catch((e) => {
                // pass
            })
    }, [])

    const router = useRouter()

    const BoxBookmarks = ({ CategoryName, Number }: typeBoxBookmarks) => {
        return (
            <>
                <button onClick={() => router.push(`/${username}/${CategoryName}`)}
                    className="border-b-1 border-zinc-400 w-10/12 hover:scale-105 duration-100">
                    <div className="flex flex-row m-2 justify-between items-center">
                        <p className="font-semibold text-xl">{CategoryName.replace("_", " ")}</p>
                        <p className="text-sm">{Number} Item</p>
                    </div>
                </button>
            </>
        )
    }

    if (status && category !== null) {
        return (
            <>
                <div className="flex flex-col py-4 mx-4">
                    <p className="text-2xl font-bold pb-5">List Bookmark-ku</p>

                    <div className="flex flex-col items-center space-y-5">
                        {category.map((bookmark, index) => (
                            <BoxBookmarks
                                key={index}
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