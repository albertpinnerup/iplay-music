'use client';

import { msToMin } from '@/lib/utils';
import { SpotifyTrack } from '@/app/server/spotify/types';
import { PlayPauseButton } from './PlayPauseButton';
import { useSpotifyPlayback } from './hooks/useSpotifyPlayback';

type SongListProps = {
    track?: SpotifyTrack; // optional because you use data?.tracks?.items
    index?: number;
};

export default function TrackListLi({ track, index }: SongListProps) {
    const artists = track?.artists?.map((artist: any) => artist.name).join(', ');
    const duration = msToMin(track?.duration_ms ?? 0);

    if (!track) {
        return <h1>No Available tracks</h1>;
    }

    const { isReady, seek, play } = useSpotifyPlayback();

    async function restartFromStart() {
        if (!isReady) return;

        await seek(0);
        await play(track?.uri);
    }

    return (
        <li
            key={`${track.id ?? track.name}-${index}`}
            className='grid grid-cols-[auto_1fr_auto] grid-rows-2 gap-x-3 items-center'
            onClick={restartFromStart}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className='col-start-1 row-start-1 row-span-2'
            >
                <PlayPauseButton uri={track.uri} trackId={track.id} />
            </div>
            <h2 className='col-start-2 text-ellipsis line-clamp-1'>{track.name}</h2>
            <p className='text-ellipsis line-clamp-1 col-start-2'>{artists}</p>
            <div className='col-start-3 row-start-1 row-span-2 flex items-center justify-end'>
                <p>{duration}</p>
            </div>
        </li>
    );
}
