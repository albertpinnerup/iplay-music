/* -------------------------------------------------------------------------- */
/* Core shared types                                                          */
/* -------------------------------------------------------------------------- */

export type SpotifyExternalUrls = {
    spotify: string;
};

export type SpotifyImage = {
    url: string;
    width: number | null;
    height: number | null;
};

export type SpotifyPaging<T> = {
    href: string;
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
    items: T[];
};

/* -------------------------------------------------------------------------- */
/* User                                                                       */
/* -------------------------------------------------------------------------- */

export type SpotifyUser = {
    id: string;
    display_name: string;
    email?: string;
    images: SpotifyImage[];
};

/* -------------------------------------------------------------------------- */
/* Artist                                                                     */
/* -------------------------------------------------------------------------- */

export type SpotifyArtist = {
    external_urls: SpotifyExternalUrls;
    href: string;
    id: string;
    name: string;
    type: 'artist';
    uri: string;
};

export type SpotifyArtistSearchItem = SpotifyArtist & {
    images?: SpotifyImage[];
    genres?: string[];
    popularity?: number;
    followers?: { total: number };
};

/* -------------------------------------------------------------------------- */
/* Album                                                                      */
/* -------------------------------------------------------------------------- */

export type SpotifyAlbum = {
    album_type: 'album' | 'single' | 'compilation';
    total_tracks: number;
    available_markets: string[];

    external_urls: SpotifyExternalUrls;
    href: string;
    id: string;

    images: SpotifyImage[];

    name: string;
    release_date: string; // "1994" | "1997-05-28"
    release_date_precision: 'year' | 'month' | 'day';

    type: 'album';
    uri: string;

    artists: SpotifyArtist[];
};

/* -------------------------------------------------------------------------- */
/* Playlist                                                                   */
/* -------------------------------------------------------------------------- */

export type SpotifyPlaylistTrackItem = {
    added_at?: string;
    track: SpotifyTrack;
};

export type SpotifyPlaylist = {
    id: string;
    name: string;
    tracks: {
        items: SpotifyPlaylistTrackItem[];
    };
    external_urls?: SpotifyExternalUrls;
    images?: SpotifyImage[];
    owner?: SpotifyUser;
    type?: 'playlist';
};

/* -------------------------------------------------------------------------- */
/* Track                                                                      */
/* -------------------------------------------------------------------------- */

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

    type: 'track';
    uri: string;
    is_local: boolean;
};

export type SpotifyTrackSearchItem = SpotifyTrack & {
    album?: SpotifyAlbum;
};

export type SpotifyTrackList = SpotifyTrack[];

/* -------------------------------------------------------------------------- */
/* Podcast: Show & Episode                                                    */
/* -------------------------------------------------------------------------- */

export type SpotifyShow = {
    available_markets: string[];
    copyrights: { text: string; type: string }[];
    description: string;
    explicit: boolean;
    external_urls: SpotifyExternalUrls;
    href: string;
    id: string;
    images: SpotifyImage[];
    name: string;
    publisher: string;
    total_episodes: number;
    type: 'show';
    uri: string;
};

export type SpotifyEpisode = {
    audio_preview_url: string | null;
    description: string;
    duration_ms: number;
    explicit: boolean;
    external_urls: SpotifyExternalUrls;
    href: string;
    id: string;
    images: SpotifyImage[];
    name: string;
    release_date: string;
    release_date_precision: 'year' | 'month' | 'day';
    show?: SpotifyShow;
    type: 'episode';
    uri: string;
};

/* -------------------------------------------------------------------------- */
/* Audiobook                                                                  */
/* -------------------------------------------------------------------------- */

export type SpotifyAudiobook = {
    authors: { name: string }[];
    available_markets: string[];
    copyrights: { text: string; type: string }[];
    description: string;
    explicit: boolean;
    external_urls: SpotifyExternalUrls;
    href: string;
    id: string;
    images: SpotifyImage[];
    name: string;
    narrators: { name: string }[];
    publisher: string;
    total_chapters: number;
    type: 'audiobook';
    uri: string;
};

/* -------------------------------------------------------------------------- */
/* Search response (ALL Spotify search types)                                 */
/* -------------------------------------------------------------------------- */

export type SpotifySearchResponse = {
    albums?: SpotifyPaging<SpotifyAlbum>;
    artists?: SpotifyPaging<SpotifyArtistSearchItem>;
    playlists?: SpotifyPaging<SpotifyPlaylist>;
    tracks?: SpotifyPaging<SpotifyTrackSearchItem>;
    shows?: SpotifyPaging<SpotifyShow>;
    episodes?: SpotifyPaging<SpotifyEpisode>;
    audiobooks?: SpotifyPaging<SpotifyAudiobook>;
};
