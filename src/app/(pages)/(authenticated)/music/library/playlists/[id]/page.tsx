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
}
