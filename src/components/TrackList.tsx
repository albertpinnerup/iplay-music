// components/TrackList.tsx
import type { SpotifyTrack } from '@/app/server/spotify/types';
import TrackListLi from './TrackListLi';

type TrackListItem = { track: SpotifyTrack };

type Props = {
    items: TrackListItem[];
};

export default function TrackList({ items }: Props) {
    return (
        <ul className='flex flex-col gap-5'>
            {items.map((item, i) => (
                <TrackListLi
                    track={item.track}
                    index={i}
                    key={`${item.track.id ?? item.track.name}-${i}`}
                />
            ))}
        </ul>
    );
}
