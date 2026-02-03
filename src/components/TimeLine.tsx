'use client';

import { useEffect, useRef, useState } from 'react';
import { useSpotifyPlayback } from './hooks/useSpotifyPlayback';
import { msToMin } from '@/lib/utils';
import { Slider } from './ui/slider';

function clamp(n: number, min: number, max: number) {
    return Math.max(min, Math.min(n, max));
}

export default function Timeline({ playerPage = false }: { playerPage?: boolean }) {
    const { currentPositionMs, currentDurationMs, currentTrackId, isPaused, seek } =
        useSpotifyPlayback();

    const duration = currentDurationMs ?? 0;
    const position = currentPositionMs ?? 0;

    const [isDragging, setIsDragging] = useState(false);
    const [draft, setDraft] = useState(0);
    const lastServerPosRef = useRef(0);
    const lastServerAtRef = useRef<number | null>(null);

    // ✅ this is the key: what we actually render
    const [displayPosition, setDisplayPosition] = useState(0);

    // Reset timeline when track changes
    useEffect(() => {
        setDraft(0);
        setDisplayPosition(0);
        setIsDragging(false);
        lastServerPosRef.current = 0;
        lastServerAtRef.current = null;
    }, [currentTrackId]);

    // Keep draft + display in sync with Spotify position when not dragging
    useEffect(() => {
        lastServerPosRef.current = position;
        lastServerAtRef.current = performance.now();
        if (!isDragging) {
            setDraft(position);
            setDisplayPosition(position);
        }
    }, [position, isDragging]);

    function computeDisplayPosition(now: number) {
        const base = lastServerPosRef.current;
        const lastAt = lastServerAtRef.current ?? now;
        if (isPaused) return base;
        return clamp(base + (now - lastAt), 0, duration);
    }

    // ✅ local ticking clock while playing
    useEffect(() => {
        if (!duration) return;
        if (isDragging) return;

        if (lastServerAtRef.current == null) {
            lastServerAtRef.current = performance.now();
        }

        const id = window.setInterval(() => {
            const now = performance.now();
            setDisplayPosition(computeDisplayPosition(now)); // 4 fps
        }, 250);

        return () => window.clearInterval(id);
    }, [duration, isPaused, isDragging]);

    if (!duration) return null;

    const sliderValue = clamp(isDragging ? draft : displayPosition, 0, duration);

    return playerPage ? (
        <div
            className='w-full flex flex-col gap-4 items-center'
            onPointerDown={(e) => e.stopPropagation()}
            onPointerMove={(e) => e.stopPropagation()}
            onPointerUp={(e) => e.stopPropagation()}
            onPointerCancel={(e) => e.stopPropagation()}
        >
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

            <div className='flex w-full justify-between text-xs text-gray-400'>
                <span>{msToMin(sliderValue)}</span>
                <span>{msToMin(duration)}</span>
            </div>
        </div>
    ) : (
        <div
            className='w-full flex gap-2 items-center'
            onPointerDown={(e) => e.stopPropagation()}
            onPointerMove={(e) => e.stopPropagation()}
            onPointerUp={(e) => e.stopPropagation()}
            onPointerCancel={(e) => e.stopPropagation()}
        >
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
    // <div
    //     className='w-full flex gap-2 items-center'
    //     onPointerDown={(e) => e.stopPropagation()}
    //     onPointerMove={(e) => e.stopPropagation()}
    //     onPointerUp={(e) => e.stopPropagation()}
    //     onPointerCancel={(e) => e.stopPropagation()}
    // >
    //     <Slider
    //         value={[sliderValue]}
    //         max={duration}
    //         step={1000}
    //         onValueChange={(value) => {
    //             setIsDragging(true);
    //             setDraft(value[0]);
    //         }}
    //         onValueCommit={async (value) => {
    //             setIsDragging(false);
    //             setDisplayPosition(value[0]); // immediate UI feedback
    //             await seek(value[0]);
    //         }}
    //         className='w-full'
    //         aria-label='Seek'
    //     />
    //
    //     <div className='flex justify-between text-xs text-gray-400'>
    //         <span>{msToMin(duration)}</span>
    //     </div>
    // </div>
}
