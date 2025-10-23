import mockData from '../data/now.mock.json';

export interface SpotifyTrack {
  track: string;
  artist: string;
  album?: string;
  isPlaying?: boolean;
  timestamp?: string;
}

export const fetchCurrentlyPlaying = async (): Promise<SpotifyTrack> => {
  // Spotify integration requires OAuth flow
  // For now, we'll return mock data unless the user implements full OAuth

  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;

  if (!clientId || !redirectUri) {
    console.warn('Spotify credentials not configured. Using mock data.');
    return mockData.spotify.currentlyPlaying;
  }

  // In a full implementation, you would:
  // 1. Use OAuth to get access token
  // 2. Call https://api.spotify.com/v1/me/player/currently-playing
  // 3. Parse and return the response

  // For this demo, we'll use mock data
  console.warn('Spotify OAuth not implemented. Using mock data.');
  return mockData.spotify.currentlyPlaying;
};

export const fetchRecentTracks = async (): Promise<SpotifyTrack[]> => {
  // Similar to currently playing, this would require full OAuth implementation
  console.warn('Using mock Spotify data');
  return mockData.spotify.recentTracks;
};
