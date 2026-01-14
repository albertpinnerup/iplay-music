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
            scope: ['user-read-email', 'user-read-private'],
            // make scopes explicit on the authorize URL
            // authorizationEndpoint: 'https://accounts.spotify.com/authorize?show_dialog=true&scope=user-read-email&user-read-private',

            // prevent Better Auth from adding provider defaults on top
            // disableDefaultScope: true,
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
