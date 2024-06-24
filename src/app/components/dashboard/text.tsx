const Title = () => {
    return (
        <>
            <div className="flex flex-col space-y-5 text-center">
                <p className="text-6xl font-bold">
                    Bookmark itu dibaca jangan disimpan
                </p>
                <p className="text-lg font-medium text-zinc-600">
                    Kumpulan Bookmark dari berbagai Social Media
                </p>

            </div>
        </>
    )
}

const ErrorLink = () => {
    return (
        <>
            <p className='text-red-700 border border-red-700 py-1 px-2 rounded-md'>
                Pastikan Link sesuai dengan Sosial Media-nya 🚨
            </p>
        </>
    )
}


export { ErrorLink, Title };