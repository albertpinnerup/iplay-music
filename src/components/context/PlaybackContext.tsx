// PlaybackContext.tsx
'use client';
import { createContext, useContext } from 'react';

const PlaybackContextUriContext = createContext<string | undefined>(undefined);

export function PlaybackContextProvider({
    contextUri,
    children,
}: {
    contextUri: string | undefined;
    children: React.ReactNode;
}) {
    return (
        <PlaybackContextUriContext.Provider value={contextUri}>
            {children}
        </PlaybackContextUriContext.Provider>
    );
}

export function usePlaybackContextUri() {
    const v = useContext(PlaybackContextUriContext);
    if (!v) throw new Error('usePlaybackContextUri must be used inside PlaybackContextProvider');
    return v;
}
