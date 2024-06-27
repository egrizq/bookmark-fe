import { Spotify } from "react-spotify-embed"

const SpotifyEmbed = ({ url }: { url: string }) => {
    return (
        <>
            <div className="pt-7">
                <Spotify width={550} link={url} />
            </div>
        </>
    )
}

export default SpotifyEmbed