'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { redirect, useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { useSession } from '@/lib/auth-client';

export default function SplashScreen() {
    const router = useRouter();
    const { data: session, isPending } = useSession();

    const SPLASH_SEEN_KEY = 'iplay:splash-seen';

    const [minTimePassed, setMinTimePassed] = useState(false);
    const [show, setShow] = useState(true);
    const [hasSeen, setHasSeen] = useState(false);

    // // 1️⃣ Enforce minimum splash duration
    useEffect(() => {
        const t = setTimeout(() => {
            setMinTimePassed(true);
        }, 2000);

        return () => clearTimeout(t);
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        setHasSeen(window.localStorage.getItem(SPLASH_SEEN_KEY) === '1');
    }, []);

    // 2️⃣ Hide splash only when BOTH conditions are met
    useEffect(() => {
        if (isPending) return;

        if (session) {
            if (minTimePassed) {
                setShow(false);
                router.push('/dashboard');
            }
            return;
        }

        // No session
        if (hasSeen) {
            setShow(false);
            router.replace('/login');
            return;
        }

        if (typeof window !== 'undefined') {
            window.localStorage.setItem(SPLASH_SEEN_KEY, '1');
        }

        if (minTimePassed) {
            setShow(false);
            router.push('/login');
        }
    }, [minTimePassed, isPending, session, router, hasSeen]);

    if (!show) return null;

    return (
        <motion.div
            className='flex flex-col items-center gap-8'
            initial={{ opacity: 0, y: 150 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 1.2,
                ease: 'easeInOut',
            }}
        >
            <Image src='/music-logo-solid.svg' alt='iPlayMusic Logo' width={200} height={215} />
            <h1 className='text-white text-4xl'>IplayMusic</h1>
        </motion.div>
    );
}
