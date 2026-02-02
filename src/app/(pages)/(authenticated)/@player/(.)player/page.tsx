'use client';

import PlayerLayout from '@/app/(pages)/(authenticated)/player/layout';
import { useSpotifyPlayer } from '@/components/context/SpotifyPlayerContext';
import { useSpotifyPlayback } from '@/components/hooks/useSpotifyPlayback';
import { PlayPauseButton } from '@/components/PlayPauseButton';
import Timeline from '@/components/TimeLine';

export default function PlayerModalPage() {
    const { track } = useSpotifyPlayer();
    const { currentDurationMs, currentPositionMs, currentTrackId, currentTrackUri } =
        useSpotifyPlayback();

    console.log('PlayerModalPage track:', track);

    if (!currentTrackId || !currentTrackUri) {
        return null;
    }

    const artists = track?.artists?.map((artist) => artist.name).join(', ');

    return (
        <PlayerLayout>
            {/* player UI */}
            <div className='flex flex-col w-full h-full p-4'>
                <div className='flex flex-col items-center justify-center w-full self-end'>
                    <h1>{track?.name}</h1>
                    <h2>{artists}</h2>
                    <Timeline />
                    <PlayPauseButton
                        uri={currentTrackUri || ''}
                        trackId={currentTrackId || undefined}
                        size={75}
                    />
                </div>
            </div>
        </PlayerLayout>
    );
}
