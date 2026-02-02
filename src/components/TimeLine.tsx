'use client';

import { useEffect, useState } from 'react';
import { useSpotifyPlayback } from './hooks/useSpotifyPlayback';
import { msToMin } from '@/lib/utils';
import { Slider } from './ui/slider';

function clamp(n: number, min: number, max: number) {
    return Math.max(min, Math.min(n, max));
}

export default function Timeline() {
    const { currentPositionMs, currentDurationMs, isPaused, seek } = useSpotifyPlayback();

    const duration = currentDurationMs ?? 0;
    const position = currentPositionMs ?? 0;

    const [isDragging, setIsDragging] = useState(false);
    const [draft, setDraft] = useState(0);

    // ✅ this is the key: what we actually render
    const [displayPosition, setDisplayPosition] = useState(0);

    // Keep draft + display in sync with Spotify position when not dragging
    useEffect(() => {
        if (!isDragging) {
            setDraft(position);
            setDisplayPosition(position);
        }
    }, [position, isDragging]);

    // ✅ local ticking clock while playing
    useEffect(() => {
        if (!duration) return;
        if (isPaused) return;
        if (isDragging) return;

        const id = window.setInterval(() => {
            setDisplayPosition((prev) => clamp(prev + 250, 0, duration)); // 4 fps
        }, 250);

        return () => window.clearInterval(id);
    }, [duration, isPaused, isDragging]);

    if (!duration) return null;

    const sliderValue = clamp(isDragging ? draft : displayPosition, 0, duration);

    return (
        <div className='w-full flex gap-2 items-center'>
            <Slider
                value={[sliderValue]}
                max={duration}
                step={1000}
                onValueChange={(value) => {
                    setIsDragging(true);
                    setDraft(value[0]);
                }}
                onValueCommit={async (value) => {
                    setIsDragging(false);
                    setDisplayPosition(value[0]); // immediate UI feedback
                    await seek(value[0]);
                }}
                className='w-full'
                aria-label='Seek'
            />

            <div className='flex justify-between text-xs text-gray-400'>
                <span>{msToMin(duration)}</span>
            </div>
        </div>
    );
}
