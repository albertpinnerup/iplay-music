'use client';

import { useSpotifyPlayer } from '@/components/context/SpotifyPlayerContext';
import { getAccessToken } from '@/lib/auth-client';

export function useSpotifyPlayback() {
    const { player, deviceId, isReady, playback } = useSpotifyPlayer();

    async function play(uri?: string) {
        if (!isReady || !deviceId) return;

        const res = await getAccessToken({ providerId: 'spotify' });
        const token = res.data?.accessToken;
        if (!token) return;

        // ▶ Resume if paused and no new URI requested
        if (playback.trackUri && playback.isPaused && !uri) {
            await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
                method: 'PUT',
                headers: { Authorization: `Bearer ${token}` },
            });
            return;
        }

        // ▶ Start new playback
        if (uri) {
            await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ uris: [uri] }),
            });
        }
    }

    async function pause() {
        if (!isReady || !deviceId) return;

        const res = await getAccessToken({ providerId: 'spotify' });
        const token = res.data?.accessToken;
        if (!token) return;

        await fetch(`https://api.spotify.com/v1/me/player/pause?device_id=${deviceId}`, {
            method: 'PUT',
            headers: { Authorization: `Bearer ${token}` },
        });
    }

    async function seek(positionMs: number) {
        // seek is SDK-side
        if (!isReady || !player) return;
        const ms = Math.max(0, Math.min(positionMs, playback.durationMs || 0));
        await player.seek(ms);
    }

    async function playFromContext(contextUri: string, trackUri?: string) {
        if (!isReady || !deviceId) return;

        const res = await getAccessToken({ providerId: 'spotify' });
        const token = res.data?.accessToken;
        if (!token) return;

        if (!contextUri) return;
        const body: any = { context_uri: contextUri };

        // Start at a specific track within the context
        if (trackUri) body.offset = { uri: trackUri };

        await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
    }

    async function next() {
        if (!isReady) return;

        if (player) {
            await player.nextTrack();
            return;
        }

        if (!deviceId) return;

        const res = await getAccessToken({ providerId: 'spotify' });
        const token = res.data?.accessToken;
        if (!token) return;

        await fetch(`https://api.spotify.com/v1/me/player/next?device_id=${deviceId}`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}` },
        });
    }

    async function previous() {
        if (!isReady) return;

        if (player) {
            await player.previousTrack();
            return;
        }

        if (!deviceId) return;

        const res = await getAccessToken({ providerId: 'spotify' });
        const token = res.data?.accessToken;
        if (!token) return;

        await fetch(`https://api.spotify.com/v1/me/player/previous?device_id=${deviceId}`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}` },
        });
    }

    return {
        isReady,
        isPaused: playback.isPaused,
        play,
        playFromContext,
        pause,
        seek,
        next,
        previous,
        currentTrackUri: playback.trackUri,
        currentTrackId: playback.trackId,
        currentPositionMs: playback.positionMs,
        currentDurationMs: playback.durationMs,
        hasNext: playback.hasNext,
        hasPrev: playback.hasPrev,
    };
}
