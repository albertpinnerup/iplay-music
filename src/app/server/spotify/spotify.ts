import 'server-only';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

async function getSpotifyAccessToken() {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) return null;

    const { accessToken } = await auth.api.getAccessToken({
        body: {
            providerId: 'spotify',
            userId: session.user.id,
        },
    });

    return { accessToken, userId: session.user.id };
}

export async function spotifyFetch<T>(path: string): Promise<T> {
    const authData = await getSpotifyAccessToken();
    if (!authData) throw new Error('Unauthorized');

    const res = await fetch(`https://api.spotify.com/v1${path}`, {
        headers: { Authorization: `Bearer ${authData.accessToken}` },
        cache: 'no-store',
    });

    if (!res.ok) {
        const err = await res.text();
        throw new Error(`Spotify ${path} failed (${res.status}): ${err}`);
    }

    return res.json() as Promise<T>;
}
