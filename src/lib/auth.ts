import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import prisma from '@/lib/prisma';
import { nextCookies } from 'better-auth/next-js';

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: 'postgresql',
    }),
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        github: {
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        },
        spotify: {
            clientId: process.env.SPOTIFY_CLIENT_ID as string,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
            scope: [
                'streaming',
                'user-read-playback-state',
                'user-modify-playback-state',
                'user-read-email',
                'user-read-private',
            ],
        },
    },
    trustedOrigins: ['http://127.0.0.1:3000'],
    advanced: {
        useSecureCookies: false,

        cookies: {
            state: {
                attributes: {
                    path: '/api/auth', // 👈 makes state cookie available to /api/auth/callback
                },
            },
        },
    },
    plugins: [nextCookies()],
});
