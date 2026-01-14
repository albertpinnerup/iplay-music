'use client';

import { signIn } from '@/lib/auth-client';

export default function AuthButton() {
    async function handleSSO() {
        await signIn.social({
            provider: 'spotify',
            callbackURL: '/dashboard',
        });
    }

    return (
        <button
            className='flex h-12 w-full items-center text-white justify-center rounded-full border border-solid border-black/[.08] text-w px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]'
            onClick={handleSSO}
            type='button'
        >
            Sign in with Spotify
        </button>
    );
}
