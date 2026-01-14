import { spotifyFetch } from '@/app/server/spotify/spotify';
import { SpotifyUser } from '@/app/server/spotify/types';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function dashboard() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect('/');
    }

    const user = (await spotifyFetch('/me')) as SpotifyUser;

    console.log(user);

    return <h1>hej {user.display_name}</h1>;
}
