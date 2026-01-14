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
