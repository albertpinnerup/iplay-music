'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

type PlaybackState = {
    isPaused: boolean;
    trackUri: string | null;
    trackId?: string | null;
    contextUri?: string | null;
    hasNext?: boolean;
    hasPrev?: boolean;
    positionMs?: number;
    durationMs?: number;
};

type SpotifyContextValue = {
    player: Spotify.Player | null;
    deviceId: string | null;
    isReady: boolean;
    playback: PlaybackState;
    track: Spotify.Track | null;
    refreshPlaybackState: () => Promise<void>;
};

const SpotifyPlayerContext = createContext<SpotifyContextValue | null>(null);

export function SpotifyPlayerProvider({
    accessToken,
    children,
}: {
    accessToken: string | null;
    children: React.ReactNode;
}) {
    const playerRef = useRef<Spotify.Player | null>(null);
    const [player, setPlayer] = useState<Spotify.Player | null>(null);
    const tokenRef = useRef<string | null>(null);

    const [deviceId, setDeviceId] = useState<string | null>(null);
    const [isReady, setIsReady] = useState(false);

    const [playback, setPlayback] = useState<PlaybackState>({
        isPaused: true,
        trackUri: null,
        trackId: null,
        positionMs: 0,
        durationMs: 0,
        contextUri: null,
        hasNext: false,
        hasPrev: false,
    });

    // Always keep the latest token available to the SDK
    useEffect(() => {
        tokenRef.current = accessToken;
    }, [accessToken]);

    const setPlaybackFromState = useCallback((state: Spotify.PlaybackState) => {
        const t = state.track_window.current_track;

        setPlayback({
            isPaused: state.paused,
            trackUri: t?.uri ?? null,
            trackId: t?.id ?? null,
            positionMs: state.position,
            durationMs: state.duration,
            hasNext: state.track_window.next_tracks.length > 0,
            hasPrev: state.track_window.previous_tracks.length > 0,
            contextUri: state.context?.uri ?? null,
        });
    }, []);

    useEffect(() => {
        if (!accessToken) return;
        if (playerRef.current) return; // already initialized

        const script = document.createElement('script');
        script.src = 'https://sdk.scdn.co/spotify-player.js';
        script.async = true;
        document.body.appendChild(script);

        window.onSpotifyWebPlaybackSDKReady = () => {
            const player = new window.Spotify.Player({
                name: 'IPlayMusic',
                getOAuthToken: (cb: (token: string) => void) => {
                    if (tokenRef.current) cb(tokenRef.current);
                },
                volume: 0.8,
            });

            playerRef.current = player;
            setPlayer(player);

            player.addListener('ready', ({ device_id }) => {
                setDeviceId(device_id);
                setIsReady(true);

                // Make the Web Playback SDK device the active device.
                // Without this, state can stay stale and pause/resume can act weird.
                const token = tokenRef.current;
                if (token) {
                    fetch('https://api.spotify.com/v1/me/player', {
                        method: 'PUT',
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ device_ids: [device_id], play: false }),
                    }).catch(console.error);
                }
            });

            player.addListener('not_ready', () => {
                setIsReady(false);
            });

            player.addListener('player_state_changed', (state) => {
                if (!state) return;
                setPlaybackFromState(state);
            });

            player.addListener('authentication_error', console.error);
            player.addListener('initialization_error', console.error);
            player.addListener('account_error', console.error);

            player.connect();
        };

        return () => {
            playerRef.current?.disconnect();
            playerRef.current = null;
            setIsReady(false);
            setDeviceId(null);
            setPlayback({ isPaused: true, trackUri: null });
        };
    }, [accessToken]);

    const [track, setTrack] = useState<Spotify.Track | null>(null);

    // Optional: fetch full track details when playback.trackId changes
    useEffect(() => {
        async function fetchTrackDetails(trackId: string) {
            const token = tokenRef.current;
            if (!token) return;
            const res = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.ok) {
                const data = await res.json();
                setTrack(data);
            }
        }

        if (playback.trackId) {
            fetchTrackDetails(playback.trackId).catch(console.error);
        } else {
            setTrack(null);
        }
    }, [playback.trackId]);

    const refreshPlaybackState = useCallback(async () => {
        if (!player) return;
        const state = await player.getCurrentState();
        if (!state) return;
        setPlaybackFromState(state);
    }, [player, setPlaybackFromState]);

    return (
        <SpotifyPlayerContext.Provider
            value={{
                player,
                deviceId,
                isReady,
                playback,
                track: track,
                refreshPlaybackState,
            }}
        >
            {children}
        </SpotifyPlayerContext.Provider>
    );
}

export function useSpotifyPlayer() {
    const ctx = useContext(SpotifyPlayerContext);
    if (!ctx) throw new Error('useSpotifyPlayer must be used inside SpotifyPlayerProvider');
    return ctx;
}
