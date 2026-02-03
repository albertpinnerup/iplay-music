'use client';

import { Pause, Play } from 'lucide-react';
import { Button } from './ui/button';
import { useSpotifyPlayback } from './hooks/useSpotifyPlayback';

export function PlayPauseButton({
    uri,
    trackId,
    size,
    contextUri,
    look = 'default',
}: {
    uri: string;
    trackId?: string;
    size?: number;
    contextUri?: string;
    look?: 'default' | 'minimal';
}) {
    const { isReady, isPaused, currentTrackId, currentTrackUri, playFromContext, play, pause } =
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
        await playFromContext(contextUri ?? '', uri);
    }

    return (
        <Button
            className={`rounded-full ${look === 'default' ? 'bg-linear-to-br from-[#EE0979] to-[#FF6A00] p-2' : 'bg-transparent '} [&_svg]:w-full! [&_svg]:h-full! `}
            onClick={toggle}
            disabled={!isReady}
            size={'icon'}
            style={{ width: size ? size : 30, height: size ? size : 30 }}
        >
            <span className={`flex items-center justify-center w-full h-full`}>
                {showPause ? (
                    <Pause fill='white' stroke='none' />
                ) : (
                    <Play fill='white' stroke='none' />
                )}
            </span>
        </Button>
    );
}
