export const TitleBookmarks = ({ category }: { category: string }) => {

    return (
        <>
            <div className="flex flex-col align-items space-y-3 pt-5">
                <p className="text-4xl font-bold">{category.replaceAll("_", " ")}</p>
            </div>
        </>
    )
}