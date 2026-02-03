'use client';

import { signOutAction } from '@/app/api/auth/actions';

export default function SignOutButton() {
    return (
        <form action={signOutAction}>
            <button
                className='flex h-12 w-full items-center text-white justify-center rounded-full border border-solid border-black/[.08] text-w px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]'
                type='submit'
            >
                Sign Out
            </button>
        </form>
    );
}
