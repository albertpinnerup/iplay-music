'use client';

import { Pause, Play } from 'lucide-react';
import { Button } from './ui/button';
import { useSpotifyPlayback } from './hooks/useSpotifyPlayback';

export function PlayPauseButton({ uri, trackId }: { uri: string; trackId?: string }) {
    const { isReady, isPaused, currentTrackId, currentTrackUri, play, pause } =
        useSpotifyPlayback();

    const isThisTrack = currentTrackId === trackId;
    const showPause = isThisTrack && !isPaused;

    async function toggle() {
        if (!isReady) return;

        // If this track is currently playing -> pause
        if (showPause) {
            await pause();
            return;
        }

        if (isThisTrack && isPaused) {
            await play(); // resume
            return;
        }

        // Otherwise -> start THIS track
        await play(uri);
    }

    console.log({ trackId, currentTrackId, uri, currentTrackUri });

    return (
        <Button
            className='rounded-full w-[30] h-[30] bg-linear-to-br from-[#EE0979] to-[#FF6A00] row-span-2 self-center'
            onClick={toggle}
            disabled={!isReady}
        >
            {showPause ? <Pause fill='white' stroke='none' /> : <Play fill='white' stroke='none' />}
        </Button>
    );
}
