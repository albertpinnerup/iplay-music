import { NextResponse } from 'next/server';
import { spotifyFetch } from '@/app/server/spotify/spotify';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const limit = searchParams.get('limit') ?? '20';
    const offset = searchParams.get('offset') ?? '0';

    const playlists = await spotifyFetch(`/me/playlists?limit=${limit}&offset=${offset}`);

    return NextResponse.json(playlists);
}
