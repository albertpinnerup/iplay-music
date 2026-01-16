import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'mosaic.scdn.co',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
