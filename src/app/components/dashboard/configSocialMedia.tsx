import { useEffect, useState } from 'react';
import { Tweet } from 'react-tweet';
import { typeURL } from '../../auth/definitions';

export const getTweetIdFromUrl = (url: string): string | null => {
    const regex = /status\/(\d+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
};

export const TweetPage = ({ url }: typeURL) => {
    const [tweetId, setTweetId] = useState<string>();

    useEffect(() => {
        if (url.includes('x.com')) {
            url = url.replace('x.com', 'twitter.com');
        }
        const id = getTweetIdFromUrl(url);
        setTweetId(id!);
    }, [url]);

    return (
        <div className="light" >
            <Tweet id={tweetId!} />
        </div>
    );
};


