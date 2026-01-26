import { spotifyFetch } from '@/app/server/spotify/spotify';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import { SpotifyPlaylist } from '@/app/server/spotify/types';
import SongListLi from '@/components/TrackListLi';
import CollectionDetailsPage from '@/components/CollectionDetails';
export default async function PlaylistDetails({ params }: { params: Promise<{ id: string }> }) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect('/login');
    }
    const { id } = await params;
    const data = await spotifyFetch<SpotifyPlaylist>(`/playlists/${id}`);

    return <CollectionDetailsPage data={data} />;

    // return (
    //     <>
    //         {/* <div className="bg-[url('/sound-wave.png')] bg-cover bg-center h-[280px] w-full absolute top-0 left-0 z-0" /> */}
    //         <div className='flex flex-col p-4 gap-4 relative h-[280px] w-full'>
    //             <Image
    //                 src={'/sound-wave.png'}
    //                 alt='header'
    //                 // className='absolute top-0 left-0 w-full'
    //                 fill
    //                 priority
    //             />
    //             {img?.url ? (
    //                 <div className='relative z-20 h-48 w-48 rounded-md self-center mt-auto overflow-hidden'>
    //                     <Image
    //                         src={img.url}
    //                         alt='playlist image'
    //                         fill
    //                         sizes='200px'
    //                         className='object-cover'
    //                     />
    //                 </div>
    //             ) : (
    //                 <div className='relative z-20 h-40 w-40 rounded-md self-center mt-auto bg-[#111625]' />
    //             )}
    //             <h1 className='relative text-center text-2xl'>{data.name}</h1>
    //         </div>
    //         <div className='p-4'>
    //             <ul className='flex flex-col gap-5'>
    //                 {data.tracks.items.map((item: any, i: number) => {
    //                     return (
    //                         <SongListLi
    //                             track={item.track}
    //                             index={i}
    //                             key={`${item.track.id ?? item.track.name}-${i}`}
    //                         />
    //                     );
    //                 })}
    //             </ul>
    //         </div>
    //     </>
    // );
}
