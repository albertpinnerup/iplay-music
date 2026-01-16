'use client';

import { signIn } from '@/lib/auth-client';
import { Button } from './ui/button';

type AuthButtonProps = {
    text: string;
};

export default function AuthButton({ text }: AuthButtonProps) {
    async function handleSSO() {
        await signIn.social({
            provider: 'spotify',
            callbackURL: '/dashboard',
        });
    }

    return (
        <Button
            className='flex h-12 w-full items-center text-white justify-center rounded-full border border-2 border-solid border-black text-w px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white dark:hover:bg-[#1a1a1a] md:w-[158px]'
            onClick={handleSSO}
            type='button'
        >
            {text}
        </Button>
    );
}
