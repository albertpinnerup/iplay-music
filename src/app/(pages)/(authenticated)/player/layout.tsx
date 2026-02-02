'use client';

import { ViewTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

export default function PlayerLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    const startYRef = useRef<number | null>(null);
    const draggingRef = useRef(false);

    const [dragY, setDragY] = useState(0);
    const [isClosing, setIsClosing] = useState(false);

    const THRESHOLD = 140;
    const MAX_DRAG = 600;

    function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
        if (isClosing) return;

        draggingRef.current = true;
        startYRef.current = e.clientY;
        setDragY(0);
        e.currentTarget.setPointerCapture(e.pointerId);
    }

    function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
        if (!draggingRef.current || startYRef.current == null || isClosing) return;
        const delta = e.clientY - startYRef.current;
        setDragY(Math.max(0, Math.min(delta, MAX_DRAG)));
    }

    function finishDrag(shouldGoBack: boolean) {
        draggingRef.current = false;
        startYRef.current = null;

        if (shouldGoBack) {
            // animate the sheet down first, THEN go back
            setIsClosing(true);
            const closeY = typeof window !== 'undefined' ? window.innerHeight : MAX_DRAG;
            setDragY(closeY);
            return;
        }

        setDragY(0);
    }

    function onPointerUp() {
        finishDrag(dragY > THRESHOLD);
    }

    // Backdrop fades as you pull down (also blurred)
    const backdropOpacity = Math.max(0, 1 - dragY / 300);

    const sheetStyle: React.CSSProperties = {
        transform: `translateY(${dragY}px)`,
        // during drag: no transition; when closing/snapping back: transition
        transition: draggingRef.current ? 'none' : 'transform 220ms ease',
        touchAction: 'none',
    };

    return (
        <ViewTransition enter='slide-in' exit='slide-out'>
            {/* Backdrop */}
            <div
                className='fixed inset-0 z-40 bg-black/60 backdrop-blur-sm'
                style={{ opacity: backdropOpacity, transition: 'opacity 180ms ease' }}
                onClick={() => finishDrag(true)}
            />

            {/* Sheet */}
            <div
                className='fixed inset-x-0 top-4 z-50 h-[calc(100vh-1rem)] rounded-xl
                   bg-background dark:bg-[#341931]
                   shadow-2xl ring-1 ring-black/10 dark:ring-white/10 px-4'
                style={sheetStyle}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={() => finishDrag(false)}
                onTransitionEnd={() => {
                    if (isClosing) router.back();
                }}
            >
                <div className='mx-auto mt-2 mb-2 h-1.5 w-12 rounded-full bg-white/20' />
                {children}
            </div>
        </ViewTransition>
    );
}
