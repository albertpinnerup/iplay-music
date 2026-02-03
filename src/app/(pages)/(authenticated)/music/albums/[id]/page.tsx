import { spotifyFetch } from '@/app/server/spotify/spotify';
import {
    SpotifyAlbum,
    SpotifyPlaylist,
    SpotifyTrack,
    SpotifyTrackList,
} from '@/app/server/spotify/types';
import CollectionDetailsPage from '@/components/CollectionDetails';
import { PlaybackContextProvider } from '@/components/context/PlaybackContext';
import SwipeBack from '@/components/SwipeBack';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function AlbumDetails({ params }: { params: Promise<{ id: string }> }) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect('/login');
    }
    const { id } = await params;
    const album = await spotifyFetch<SpotifyAlbum>(`/albums/${id}`);
    const tracks = await spotifyFetch<{ items: SpotifyTrackList }>(`/albums/${id}/tracks`);

    const data = {
        id: album.id,
        name: album.name,
        images: album.images,
        artists: album.artists,
        tracks: {
            items: tracks.items.map((t: SpotifyTrack) => ({ track: t })),
        },
        uri: album.uri,
    };

    // const albumData: any = await spotifyFetch( xx)

    return (
        <SwipeBack>
            <PlaybackContextProvider contextUri={data?.uri}>
                <CollectionDetailsPage data={data} />
            </PlaybackContextProvider>
        </SwipeBack>
    );
}
