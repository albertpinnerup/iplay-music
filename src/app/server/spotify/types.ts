export type SpotifyUser = {
    id: string;
    display_name: string;
    email?: string;
    images: { url: string; width: number | null; height: number | null }[];
};

export type SpotifyPlaylist = {
    id: string;
    name: string;
    tracks: { total: number };
};

export type SpotifyExternalUrls = {
    spotify: string;
};

export type SpotifyArtist = {
    external_urls: SpotifyExternalUrls;
    href: string;
    id: string;
    name: string;
    type: 'artist';
    uri: string;
};

export type SpotifyLinkedFrom = {
    external_urls: SpotifyExternalUrls;
    href: string;
    id: string;
    type: string;
    uri: string;
};

export type SpotifyRestrictions = {
    reason: string;
};

export type SpotifyTrack = {
    artists: SpotifyArtist[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_urls: SpotifyExternalUrls;
    href: string;
    id: string;
    is_playable: boolean;
    linked_from?: SpotifyLinkedFrom;
    restrictions?: SpotifyRestrictions;
    name: string;
    preview_url: string | null;
    track_number: number;
    type: 'track' | string;
    uri: string;
    is_local: boolean;
};

export type SpotifyTrackList = SpotifyTrack[];
