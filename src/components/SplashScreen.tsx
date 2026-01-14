'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { redirect } from 'next/navigation';

export default function SplashScreen() {
    const [show, setShow] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setShow(false);
            redirect('/login');
        }, 1500);
    }, []);

    if (!show) return null;

    return (
        <div className='flex flex-col items-center gap-8'>
            <Image src='/music-logo-solid.svg' alt='iPlayMusic Logo' width={200} height={215} />
            <h1 className='text-white text-4xl'>IplayMusic</h1>
        </div>
    );
}
