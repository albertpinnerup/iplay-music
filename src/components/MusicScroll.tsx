// app/(whatever)/music/DecadeSection.tsx
import { spotifyFetch } from '@/app/server/spotify/spotify';
import type { SpotifyAlbum, SpotifySearchResponse } from '@/app/server/spotify/types';
import Image from 'next/image';
import Link from 'next/link';

type Decade = 1960 | 1970 | 1980 | 1990 | 2000 | 2010;

type Props = {
    decade: Decade;
    limit?: number;
};

export default async function DecadeSection({ decade, limit = 10 }: Props) {
    const params = new URLSearchParams({
        q: `year:${decade}-${decade + 9}`,
        type: 'album',
        limit: String(limit),
    });

    const data = await spotifyFetch<SpotifySearchResponse>(`/search?${params.toString()}`);
    const albums: SpotifyAlbum[] = data.albums?.items ?? [];

    // console.log('albums', albums);

    return (
        <section className='space-y-3'>
            <h2 className='text-lg font-semibold'>{decade}s</h2>

            <div className='flex overflow-scroll scrollbar-hide gap-x-4 gap-y-2'>
                {albums.map((a) => (
                    <Link
                        key={a.id}
                        className='rounded-md relative w-40 shrink-0 aspect-square bg-[#111625] p-3'
                        href={`/music/albums/${a.id}`}
                    >
                        <Image
                            src={a.images?.[0].url}
                            alt='cover art'
                            fill
                            className='object-cover'
                            sizes='200px'
                        />
                        {/* <p className='line-clamp-1'>{a.name}</p> */}
                        {/* <p className='text-sm opacity-70 line-clamp-1'>{a.artists?.[0]?.name}</p> */}
                    </Link>
                ))}
            </div>
        </section>
    );
}
