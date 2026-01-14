// src/app/api/auth/callback/route.ts
// import { auth } from '@/lib/auth';
// import { toNextJsHandler } from 'better-auth/next-js';
//
// export const { GET, POST } = toNextJsHandler(auth);

// export async function GET(req: Request) {
//     const url = new URL(req.url);
//
//     // Rewrite to the provider-specific callback that Better Auth expects
//     const target = new URL('/api/auth/callback/spotify', url.origin);
//     target.search = url.search;
//
//     // Forward cookies so Better Auth can validate state
//     const res = await fetch(target, {
//         method: 'GET',
//         headers: {
//             cookie: req.headers.get('cookie') ?? '',
//             // optional, but harmless:
//             'user-agent': req.headers.get('user-agent') ?? '',
//             accept: req.headers.get('accept') ?? '*/*',
//         },
//         redirect: 'manual', // preserve Better Auth redirects back to your app
//     });
//
//     // Pass through status + headers (including Set-Cookie)
//     return new Response(res.body, {
//         status: res.status,
//         headers: res.headers,
//     });
// }
//

import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET!;
const REDIRECT_URI = 'http://127.0.0.1:3000/api/auth/callback';

export async function GET(req: Request) {
    const url = new URL(req.url);
    const code = url.searchParams.get('code');
    const cookieStore = await cookies();
    if (!code) return new Response('Missing code', { status: 400 });

    const verifier = cookieStore.get('SPOTIFY_CODE_VERIFIER')?.value;
    if (!verifier) return new Response('Missing code_verifier cookie', { status: 400 });

    const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET),
        },
        body: new URLSearchParams({
            grant_type: 'authorization_code',
            code,
            redirect_uri: REDIRECT_URI,
            code_verifier: verifier, // ✅ this is what Spotify is demanding
        }),
    });

    if (!tokenRes.ok) {
        const err = await tokenRes.text();
        return new Response(err, { status: 500 });
    }

    const data = await tokenRes.json();

    cookieStore.set('IPM_AT', data.access_token, {
        httpOnly: true,
        sameSite: 'lax',
        secure: false,
        path: '/',
        maxAge: data.expires_in,
    });

    if (data.refresh_token) {
        cookieStore.set('IPM_RT', data.refresh_token, {
            httpOnly: true,
            sameSite: 'lax',
            secure: false,
            path: '/',
            maxAge: data.expires_in * 5,
        });
    }

    // One-time use verifier
    cookieStore.set('SPOTIFY_CODE_VERIFIER', '', { path: '/api/auth', maxAge: 0 });

    return NextResponse.redirect('http://127.0.0.1:3000/dashboard');
}
