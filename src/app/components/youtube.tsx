const getYouTubeId = (url: string): string | null => {
    const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}


const Youtube = ({ url }: { url: string }) => {
    const urlID = getYouTubeId(url)

    return (
        <>
            <iframe width="550" height="315" src={`https://www.youtube.com/embed/${urlID}`}
                className="rounded-lg"
                title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin" allowFullScreen>
            </iframe>
        </>
    )
}

export default Youtube

// link
// https://youtu.be/9p6Q19ZlrcM?si=ydSBqm93pWn1KVdo
// https://www.youtube.com/watch?v=44pt8w67S8I

// embed link
// https://www.youtube.com/embed/9p6Q19ZlrcM?si=PFoR3ls1YDbUNQHe
// https://www.youtube.com/embed/44pt8w67S8I?si=7TokoTkK-ej1lsVx
