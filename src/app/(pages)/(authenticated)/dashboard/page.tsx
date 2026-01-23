import MusicScroll from '@/components/MusicScroll';
import Playlists from '@/components/PlayLists';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

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
                <MusicScroll />
            </div>
        </>
    );
}
