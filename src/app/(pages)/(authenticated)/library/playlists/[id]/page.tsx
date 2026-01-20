import { spotifyFetch } from '@/app/server/spotify/spotify';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import { msToMin } from '@/lib/utils';
import SongList from '@/components/SongList';
export default async function PlaylistDetails({ params }: { params: Promise<{ id: string }> }) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect('/');
    }
    const { id } = await params;
    const data: any = await spotifyFetch(`/playlists/${id}`);
    // const albumData: any = await spotifyFetch( xx)

    const img = data.images[0];

    console.log(data.tracks.items);

    return (
        <>
            {/* <div className="bg-[url('/sound-wave.png')] bg-cover bg-center h-[280px] w-full absolute top-0 left-0 z-0" /> */}
            <div className='flex flex-col p-4 gap-4 relative h-[280px] w-full'>
                <Image
                    src={'/sound-wave.png'}
                    alt='header'
                    // className='absolute top-0 left-0 w-full'
                    fill
                    priority
                />
                <Image
                    src={img.url}
                    height={img.height}
                    width={img.width}
                    alt='playlist image'
                    className='relative z-20 h-40 w-40 rounded-md self-center justify-center mt-auto'
                />
                <h1 className='relative text-center text-2xl'>{data.name}</h1>
            </div>
            <div className='p-4'>
                <ul className='flex flex-col gap-5'>
                    {data.tracks.items.map((item: any, i: number) => {
                        return (
                            <SongList
                                track={item.track}
                                index={i}
                                key={`${item.track.id ?? item.track.name}-${i}`}
                            />
                        );
                    })}
                </ul>
            </div>
        </>
    );
}
