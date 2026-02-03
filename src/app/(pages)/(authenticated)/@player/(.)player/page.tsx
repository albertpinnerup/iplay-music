'use client';

import PlayerLayout from '@/app/(pages)/(authenticated)/player/layout';
import { useEffect } from 'react';
import { useSpotifyPlayer } from '@/components/context/SpotifyPlayerContext';
import { useSpotifyPlayback } from '@/components/hooks/useSpotifyPlayback';
import NextPrev from '@/components/NextPrev';
import { PlayPauseButton } from '@/components/PlayPauseButton';
import Timeline from '@/components/TimeLine';
import Image from 'next/image';

export default function PlayerModalPage() {
    const { track, refreshPlaybackState } = useSpotifyPlayer();
    const { currentDurationMs, currentPositionMs, currentTrackId, currentTrackUri } =
        useSpotifyPlayback();

    useEffect(() => {
        refreshPlaybackState().catch(() => {});
    }, [refreshPlaybackState]);

    if (!currentTrackId || !currentTrackUri) {
        return null;
    }

    const artists = track?.artists?.map((artist) => artist.name).join(', ');
    const img = track?.album.images[0];
    const coverSize = 240;
    return (
        <PlayerLayout>
            {/* player UI */}
            <div className='flex flex-col w-full h-full p-4'>
                <div className='flex flex-col items-center justify-center w-full gap-6 self-end'>
                    {img?.url ? (
                        <div
                            className='relative z-20 aspect-square w-full  h-full rounded-md self-center mt-4 mb-4 overflow-hidden'
                            // style={{ width: coverSize, height: coverSize }}
                        >
                            <Image
                                src={img.url}
                                alt='cover image'
                                fill
                                sizes={`${coverSize}px`}
                                className='object-cover'
                            />
                        </div>
                    ) : (
                        <div
                            className='relative z-20 mt-auto self-center rounded-md bg-[#111625]'
                            style={{ width: coverSize, height: coverSize }}
                        />
                    )}

                    <div className='flex flex-col items-center text-center gap-2'>
                        <h1>{track?.name}</h1>
                        <h2>{artists}</h2>
                    </div>
                    <Timeline playerPage={true} />
                    <NextPrev>
                        <PlayPauseButton
                            uri={currentTrackUri || ''}
                            trackId={currentTrackId || undefined}
                            size={75}
                        />
                    </NextPrev>
                </div>
            </div>
        </PlayerLayout>
    );
}
