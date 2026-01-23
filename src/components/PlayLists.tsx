import { spotifyFetch } from '@/app/server/spotify/spotify';
import Image from 'next/image';
import Link from 'next/link';

type PlaylistImage = { width: number; height: number; url: string };
type Playlist = { id: string; name: string; images: PlaylistImage[] };
type SpotifyPlaylistsResponse = {
    items: Playlist[];
};

// async function getPlaylists() {
//     const res = await fetch(
//         `${process.env.BETTER_AUTH_URL}/api/spotify/playlists?limit=8&offset=0`,
//         {
//             cache: 'no-store', // or next: { revalidate: 60 }
//         }
//     );
//
//     if (!res.ok) throw new Error('Failed to load playlists');
//     const data = await res.json();
//     return data.items as Playlist[];
// }

export default async function Playlists({ dashboard }: { dashboard: boolean }) {
    if (!dashboard) return null;

    const data = await spotifyFetch<SpotifyPlaylistsResponse>('/me/playlists?limit=8');
    const playlists: Playlist[] = data.items;
    // console.log(playlists);

    return (
        <div className='grid grid-cols-2 gap-x-4 gap-y-2'>
            {playlists.map((p) => {
                const img = p.images?.[1] ?? p.images?.[0];
                if (!img) return null;

                return (
                    <Link
                        href={`/library/playlists/${p.id}`}
                        key={p.id}
                        className='flex items-center gap-4 bg-[#111625] rounded-md'
                    >
                        <Image
                            src={img.url}
                            alt={p.name}
                            width={img.width}
                            height={img.height}
                            sizes='56px'
                            className='h-14 w-14 object-cover rounded-l-md'
                        />
                        <p className='flex-1 line-clamp-2'>{p.name}</p>
                    </Link>
                );
            })}
        </div>
    );
}
