import { spotifyFetch } from '@/app/server/spotify/spotify';
import { Link } from 'lucide-react';

export default async function MusicScroll() {
    const data = await spotifyFetch('/search?q=year:1990-1999&type=album&&limit=10');

    console.log('90s data', data);

    return <h1>90's'</h1>;
    // return (
    //     <div className='grid grid-cols-2 gap-x-4 gap-y-2'>
    //         {albums.map((p) => {
    //             const img = p.images?.[1] ?? p.images?.[0];
    //             if (!img) return null;
    //
    //             return (
    //                 <Link
    //                     href={`/library/playlists/${p.id}`}
    //                     key={p.id}
    //                     className='flex items-center gap-4 bg-[#111625] rounded-md'
    //                 >
    //                     <Image
    //                         src={img.url}
    //                         alt={p.name}
    //                         width={img.width}
    //                         height={img.height}
    //                         sizes='56px'
    //                         className='h-14 w-14 object-cover rounded-l-md'
    //                     />
    //                     <p className='flex-1 line-clamp-2'>{p.name}</p>
    //                 </Link>
    //             );
    //         })}
    //     </div>
    // );
}
