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

    return {
        isReady,
        isPaused: playback.isPaused,
        play,
        pause,
        seek,
        currentTrackUri: playback.trackUri,
        currentTrackId: playback.trackId,
        currentPositionMs: playback.positionMs,
        currentDurationMs: playback.durationMs,
    };
}
