'use client';

import { useEffect, useState } from 'react';

import Header from '@/components/Header';
import NavBar from '@/components/NavBar';

import { useSession, getAccessToken } from '@/lib/auth-client';
import { SpotifyPlayerProvider } from '@/components/context/SpotifyPlayerContext';

export default function AuthenticatedLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { data: session, isPending } = useSession();
    const [spotifyToken, setSpotifyToken] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        async function load() {
            if (!session || isPending) {
                if (!cancelled) setSpotifyToken(null);
                return;
            }

            const res = await getAccessToken({
                providerId: 'spotify',
            });
            console.log(res.data?.scopes);

            if (!cancelled) setSpotifyToken(res.data?.accessToken ?? null);
        }

        load().catch(() => {
            if (!cancelled) setSpotifyToken(null);
        });

        return () => {
            cancelled = true;
        };
    }, [session, isPending]);

    return (
        <SpotifyPlayerProvider accessToken={spotifyToken}>
            <div className='flex flex-col min-h-screen dark:bg-[#341931]'>
                <header className='fixed z-20 top-0 w-full'>
                    <Header />
                </header>

                <main className='p-4 pb-20'>{children}</main>

                <footer className='fixed bottom-0 w-full'>
                    <NavBar />
                </footer>
            </div>
        </SpotifyPlayerProvider>
    );
}
