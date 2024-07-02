import { useEffect, useState } from "react"
import { z } from "zod"

interface typeDelete {
    id: string
    username: string
}

const schemaError = z.object({
    StatusCode: z.number(),
    Message: z.string()
})

const DeleteBookmarks = ({ id, username }: typeDelete) => {
    const [isFetch, setIsFetch] = useState(false)

    const handleDeleteBookmarks = async () => {
        try {
            const response = await fetch(`http://localhost:8000/bookmark/${id}/${username}`, {
                method: "DELETE",
                credentials: "include"
            })
            if (!response.ok) {
                const errorMessage = response.json()
                const { Message } = schemaError.parse(errorMessage)
                throw new Error(Message);
            }

            location.reload()
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message)

            }
        }
    }

    useEffect(() => {
        if (isFetch) handleDeleteBookmarks()
    }, [isFetch, setIsFetch])

    return (
        <>
            <button className="text-red-700 border border-red-700 py-1 px-2 rounded-md hover:bg-red-700 hover:text-white"
                onClick={() => setIsFetch(!isFetch)}>
                Delete
            </button>
        </>
    )
}

export default DeleteBookmarks