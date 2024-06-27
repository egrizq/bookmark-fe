interface typeButton {
    text: string;
    isSubmitting: boolean;
    error?: any;
    message: string;
}

const ButtonSubmit = ({ isSubmitting, error, message, text }: typeButton) => {
    return (
        <>
            <button type="submit"
                className="text-lg w-full text-white font-medium py-1 px-3 border bg-zinc-800 hover:bg-zinc-900 border-zinc-800 rounded-lg">
                {isSubmitting ? "Wait..." : text}
            </button>
            {error && <div className="text-red-500">{message}</div>}
        </>
    )
}

export default ButtonSubmit;