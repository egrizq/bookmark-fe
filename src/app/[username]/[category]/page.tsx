import { TitleBookmarks } from "@/app/components/media/title";
import GetBookmarksByCategory, { NavBarMedia } from "./media";

type ProductProps = {
    params: {
        username: string;
        category: string;
    };
};

export default function Product({ params }: ProductProps) {
    return (
        <>
            <NavBarMedia
                username={params.username}
            />

            <main className="container mx-auto pt-20 py-10 text-zinc-800">
                <div className="flex justify-center">
                    <div className="flex flex-col w-6/12">
                        <TitleBookmarks category={params.category} />

                        <GetBookmarksByCategory
                            username={params.username}
                            category={params.category}
                        />
                    </div>
                </div>
            </main>
        </>
    )
}