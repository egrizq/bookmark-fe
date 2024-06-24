import { ChangeEventHandler } from "react"

interface typeSosmed {
    id: string
    setValue: ChangeEventHandler<HTMLSelectElement>;
}

const sosmed = [
    { value: 'tw', label: 'X / Twitter' },
    { value: 'sp', label: 'Spotify' },
    { value: 'ig', label: 'Instagram' },
    { value: 'yt', label: 'Youtube' },
    { value: 'tt', label: 'TikTok' },
];

const SelectSocialMedia = ({ id, setValue }: typeSosmed) => {
    return (
        <div>
            <select id={id}
                onChange={setValue}
                className="border hover:bg-zinc-900 border-zinc-800 bg-zinc-800 text-gray-900 text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                {sosmed.map((media) => (
                    <option key={media.value} value={media.value}>{media.label}</option>
                ))}
            </select>
        </div>
    )
}

export default SelectSocialMedia;