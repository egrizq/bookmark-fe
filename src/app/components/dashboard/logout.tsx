import { useRouter } from "next/navigation";

const LogoutButton = () => {
    const router = useRouter()

    const handleLogout = async () => {
        try {
            const response = await fetch("http://localhost:8000/bookmark/logout", {
                method: "GET",
                credentials: "include",
            })
            if (!response.ok) {
                throw new Error("logout error")
            } else {
                router.push("/login")
            }
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message)
            }
        }
    }

    return (
        <>
            <button onClick={handleLogout}>
                Log Out
            </button>
        </>
    )
};

export { LogoutButton }