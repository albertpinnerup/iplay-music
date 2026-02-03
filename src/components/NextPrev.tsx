'use client';

import { SkipBack, SkipForward } from 'lucide-react';
import { Button } from './ui/button';
import { useSpotifyPlayback } from './hooks/useSpotifyPlayback';

export default function NextPrev({ children }: { children?: React.ReactNode }) {
    const { isReady, next, previous, hasNext, hasPrev } = useSpotifyPlayback();

    return (
        <div className='flex items-center gap-2'>
            <Button
                size='icon'
                variant='ghost'
                disabled={!isReady || !hasPrev}
                onClick={previous}
                className='[&_svg]:w-[25px]! [&_svg]:h-[25px]!'
            >
                <SkipBack className='w-8 h-8' fill='white' />
            </Button>
            {children}
            <Button
                size='icon'
                variant='ghost'
                disabled={!isReady || !hasNext}
                onClick={next}
                className='[&_svg]:w-[25px]! [&_svg]:h-[25px]!'
            >
                <SkipForward className='w-8 h-8' fill='white' />
            </Button>
        </div>
    );
}
