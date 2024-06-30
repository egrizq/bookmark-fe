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

    const handleDeleteBookmarks = () => {
        fetch(`http://localhost:8000/bookmark/${id}/${username}`, {
            method: "DELETE",
            credentials: "include"
        })
            .then((response) => {
                if (!response.ok) {
                    const errorMessage = response.json()
                    const { Message } = schemaError.parse(errorMessage)
                    throw new Error(Message);
                }

                location.reload();
            })
            .catch((error) => {
                if (error instanceof Error) {
                    alert(error.message)
                }
            })
    }

    return (
        <>
            <button onClick={handleDeleteBookmarks}>
                Delete
            </button>
        </>
    )
}

export default DeleteBookmarks