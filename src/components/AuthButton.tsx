'use client';

import { signIn, signOut } from '@/lib/auth-client';
import { Button } from './ui/button';
import { useState } from 'react';
import LoadingOverlay from './LoadingOverlay';
import { useRouter } from 'next/navigation';

type AuthButtonProps = {
    text: string;
    mode: 'signIn' | 'signOut';
};

export default function AuthButton({ text, mode }: AuthButtonProps) {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    async function handleClick() {
        if (isLoading) return;

        try {
            setIsLoading(true);

            if (mode === 'signOut') {
                await signOut();
                router.replace('/login');
                return;
            }

            await signIn.social({
                provider: 'spotify',
                callbackURL: '/dashboard',
            });
        } finally {
            // For signIn, redirect often happens before this runs. That's fine.
            setIsLoading(false);
        }
    }

    return (
        <>
            <Button
                className='flex h-12 w-full items-center text-white justify-center bg-transparent rounded-full border border-2 border-solid border-black text-w px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white dark:hover:bg-[#1a1a1a] md:w-[158px]'
                onClick={handleClick}
                type='button'
            >
                {text}
            </Button>
            {isLoading && <LoadingOverlay />}
        </>
    );
}
