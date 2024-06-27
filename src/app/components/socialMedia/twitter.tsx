import { useEffect, useState } from 'react';
import { Tweet } from 'react-tweet';
import { typeURL } from '../../type/definitions';

export const getTweetIdFromUrl = (url: string): string | null => {
    const regex = /status\/(\d+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
};

export const TweetEmbed = ({ url }: typeURL) => {
    const [tweetId, setTweetId] = useState<string>();

    useEffect(() => {
        if (url.includes('x.com')) {
            url = url.replace('x.com', 'twitter.com');
        }
        const id = getTweetIdFromUrl(url);
        setTweetId(id!);
    }, [url]);

    return (
        <div className="light flex justify-center w-10/12">
            <Tweet id={tweetId!} />
        </div>
    );
};


