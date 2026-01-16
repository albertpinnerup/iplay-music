import { spotifyFetch } from '@/app/server/spotify/spotify';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function PlaylistDetails({ params }: { params: Promise<{ id: string }> }) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect('/');
    }
    const { id } = await params;
    const data = await spotifyFetch(`/playlists/${id}`);

    console.log(data);

    return (
        <div>
            <h1>{data.name}</h1>
            <ul>
                <li></li>
            </ul>
        </div>
    );
}
