import DecadeSection from '@/components/MusicScroll';
import MusicScroll from '@/components/MusicScroll';
import Playlists from '@/components/PlayLists';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

type Decade = 1960 | 1970 | 1980 | 1990 | 2000 | 2010;

const DECADES: Decade[] = [1960, 1970, 1980, 1990, 2000, 2010];

export default async function dashboard() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect('/');
    }

    return (
        <>
            <div className='flex flex-col gap-4'>
                <h1 className='bg-linear-to-br from-[#EE0979] to-[#FF6A00] bg-clip-text text-transparent'>
                    Playlists
                </h1>
                <Playlists dashboard={true} />
                <h1 className='bg-linear-to-br mt-4 from-[#EE0979] to-[#FF6A00] bg-clip-text text-transparent'>
                    Albums
                </h1>
                <div className='space-y-10'>
                    {DECADES.map((decade) => (
                        <Suspense key={decade} fallback={<DecadeSkeleton decade={decade} />}>
                            <DecadeSection decade={decade} limit={10} />
                        </Suspense>
                    ))}
                </div>
            </div>
        </>
    );
}

function DecadeSkeleton({ decade }: { decade: number }) {
    return (
        <section className='space-y-3'>
            <h2 className='text-lg font-semibold'>{decade}s</h2>
            <div className='grid grid-cols-2 gap-x-4 gap-y-2'>
                {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className='h-16 rounded-md bg-[#111625]/60 animate-pulse' />
                ))}
            </div>
        </section>
    );
}
