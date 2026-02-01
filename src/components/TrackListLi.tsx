import { msToMin } from '@/lib/utils';
import { SpotifyTrack } from '@/app/server/spotify/types';
import { PlayPauseButton } from './PlayPauseButton';

type SongListProps = {
    track?: SpotifyTrack; // optional because you use data?.tracks?.items
    index?: number;
};

export default function TrackListLi({ track, index }: SongListProps) {
    const artists = track?.artists?.map((artist: any) => artist.name).join(', ');
    const duration = msToMin(track?.duration_ms ?? 0);

    // console.log(artists);

    // console.log('tracks', track);

    if (!track) {
        return <h1>No Available tracks</h1>;
    }

    // return null;
    return (
        <li
            key={`${track.id ?? track.name}-${index}`}
            className='grid grid-cols-[auto_1fr_auto] grid-rows-2 gap-x-3 items-center'
        >
            {/* <Button className='rounded-full w-[30] h-[30] bg-linear-to-br from-[#EE0979] to-[#FF6A00] row-span-2 self-center'> */}
            {/*     <Play fill='white' stroke='none' /> */}
            {/* </Button> */}
            <PlayPauseButton uri={track.uri} trackId={track.id} />
            <h2 className='col-start-2 text-ellipsis line-clamp-1'>{track.name}</h2>
            <p className='text-ellipsis line-clamp-1 col-start-2'>{artists}</p>
            <div className='col-start-3 row-start-1 row-span-2 flex items-center justify-end'>
                <p>{duration}</p>
            </div>
        </li>
    );
}
