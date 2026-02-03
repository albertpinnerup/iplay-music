// components/CollectionDetailsPage.tsx
import Image from 'next/image';
import type {
    SpotifyArtist,
    SpotifyImage,
    SpotifyTrack,
    SpotifyTrackList,
} from '@/app/server/spotify/types';
import TrackList from './TrackList';

type TrackListItem = { track: SpotifyTrack };

type Collection = {
    id: string;
    name: string;
    images?: SpotifyImage[];
    artists?: SpotifyArtist[];
    tracks: {
        items: TrackListItem[];
    };
    uri?: string;
};

type Props = {
    data: Collection;
    headerBgSrc?: string;
    coverSize?: number; // px
};

export default function CollectionDetailsPage({
    data,
    headerBgSrc = '/sound-wave.png',
    coverSize = 192, // 48 * 4
}: Props) {
    const img = data.images?.[0];
    const artists = data?.artists?.map((artist: SpotifyArtist) => artist.name).join(', ');

    return (
        <>
            <div className='relative flex h-full w-full flex-col p-4'>
                <Image src={headerBgSrc} alt='header' fill priority className='object-fill' />

                {img?.url ? (
                    <div
                        className='relative z-20 h-48 w-48 rounded-md self-center mt-4 mb-4 overflow-hidden'
                        // style={{ width: coverSize, height: coverSize }}
                    >
                        <Image
                            src={img.url}
                            alt='cover image'
                            fill
                            sizes={`${coverSize}px`}
                            className='object-cover'
                        />
                    </div>
                ) : (
                    <div
                        className='relative z-20 mt-auto self-center rounded-md bg-[#111625]'
                        style={{ width: coverSize, height: coverSize }}
                    />
                )}
                {artists && <h3 className='relative z-20 text-center text-xl'>{artists}</h3>}

                <h1 className='relative z-20 text-center text-2xl'>{data.name}</h1>
            </div>

            <div className='p-4 mt-4'>
                <TrackList items={data.tracks.items} />
            </div>
        </>
    );
}
