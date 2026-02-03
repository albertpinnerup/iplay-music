'use client';

import { useRef } from 'react';
import { useRouter } from 'next/navigation';

type Props = {
    children: React.ReactNode;
    className?: string;
    edgePx?: number;
    thresholdPx?: number;
};

export default function SwipeBack({ children, className, edgePx = 24, thresholdPx = 80 }: Props) {
    const router = useRouter();
    const startXRef = useRef<number | null>(null);
    const startYRef = useRef<number | null>(null);
    const trackingRef = useRef(false);

    function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
        if (e.pointerType === 'mouse') return;
        if (e.clientX > edgePx) return;
        trackingRef.current = true;
        startXRef.current = e.clientX;
        startYRef.current = e.clientY;
    }

    function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
        if (!trackingRef.current || startXRef.current == null || startYRef.current == null) return;
        const dx = e.clientX - startXRef.current;
        const dy = e.clientY - startYRef.current;
        if (dx > 0 && Math.abs(dx) > Math.abs(dy) * 1.2) {
            // prevent the browser from treating this as a scroll
            e.preventDefault();
        }
    }

    function onPointerUp(e: React.PointerEvent<HTMLDivElement>) {
        if (!trackingRef.current || startXRef.current == null || startYRef.current == null) return;
        const dx = e.clientX - startXRef.current;
        const dy = e.clientY - startYRef.current;
        const isHorizontal = dx > 0 && Math.abs(dx) > Math.abs(dy) * 1.2;
        const shouldGoBack = isHorizontal && dx > thresholdPx;

        trackingRef.current = false;
        startXRef.current = null;
        startYRef.current = null;

        if (!shouldGoBack) return;

        const doNav = () => {
            if (typeof window !== 'undefined' && window.history.length <= 1) {
                router.replace('/dashboard');
                return;
            }
            router.back();
        };

        if (typeof document !== 'undefined' && 'startViewTransition' in document) {
            document.startViewTransition(() => {
                doNav();
            });
            return;
        }

        doNav();
    }

    function onPointerCancel() {
        trackingRef.current = false;
        startXRef.current = null;
        startYRef.current = null;
    }

    return (
        <div
            className={className}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerCancel}
        >
            {children}
        </div>
    );
}
