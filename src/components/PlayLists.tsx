import { spotifyFetch } from '@/app/server/spotify/spotify';
import Image from 'next/image';
import Link from 'next/link';
import type { SpotifyImage } from '@/app/server/spotify/types';
import type { SpotifyPlaylist } from '@/app/server/spotify/types';

type SpotifyPlaylistsResponse = {
    items: SpotifyPlaylist[];
};

export default async function Playlists({ dashboard }: { dashboard: boolean }) {
    if (!dashboard) return null;

    const data = await spotifyFetch<SpotifyPlaylistsResponse>('/me/playlists?limit=8');
    const playlists: SpotifyPlaylist[] = data.items;
    //

    return (
        <div className='grid grid-cols-2 gap-x-4 gap-y-2'>
            {playlists.map((p) => {
                const img = p.images?.[1] ?? p.images?.[0];
                if (!img) return null;

                return (
                    <Link
                        href={`/music/library/playlists/${p.id}`}
                        key={p.id}
                        className='flex items-center gap-4 bg-[#111625] rounded-md'
                    >
                        <Image
                            src={img.url}
                            alt={p.name}
                            width={img.width ?? undefined}
                            height={img.height ?? undefined}
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
