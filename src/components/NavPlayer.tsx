'use client';

import Image from 'next/image';
import { useSpotifyPlayback } from './hooks/useSpotifyPlayback';
import { PlayPauseButton } from './PlayPauseButton';
import Timeline from './TimeLine';
import { useSpotifyPlayer } from './context/SpotifyPlayerContext';
import Link from 'next/link';

export default function NavPlayer() {
    const { currentTrackId, currentTrackUri } = useSpotifyPlayback();
    const { track } = useSpotifyPlayer();

    if (!currentTrackId || !currentTrackUri) {
        return null;
    }

    const trackImageUrl = track?.album.images[0]?.url || '/default-track-image.png';

    return (
        <div className='flex items-center w-full h-full py-2 px-2 gap-3 dark:bg-[#111625] border-b border-gray-800'>
            <Link href={`/player/`} className='flex items-center w-[48px] shrink-0 h-full'>
                <Image
                    src={trackImageUrl}
                    alt='Track Art'
                    width={48}
                    height={48}
                    className='rounded-md'
                />
            </Link>

            <Timeline />

            <PlayPauseButton
                trackId={currentTrackId || undefined}
                uri={currentTrackUri || ''}
                size={25}
                look='minimal'
            />
        </div>
    );
}
