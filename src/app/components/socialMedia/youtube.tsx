const getYouTubeId = (url: string): string | null => {
    const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}


const YoutubeEmbed = ({ url }: { url: string }) => {
    const urlID = getYouTubeId(url)

    return (
        <>
            <div className="pt-7">
                <iframe width="550" height="315" src={`https://www.youtube.com/embed/${urlID}`}
                    className="rounded-lg"
                    title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin" allowFullScreen>
                </iframe>
            </div>
        </>
    )
}

export default YoutubeEmbed
