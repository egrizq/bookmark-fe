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

            location.reload();
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
            <button className="hover:scale-110 duration-100"
                onClick={() => setIsFetch(!isFetch)}>
                <img src="/delete.svg" width={25} />
            </button>
        </>
    )
}

export default DeleteBookmarks