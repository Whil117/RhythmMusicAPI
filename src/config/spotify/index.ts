import SpotifyWebApi from 'spotify-web-api-node';
import CONFIG from '..';

const scopes = [
  'user-top-read',
  'user-read-currently-playing',
  'user-read-playback-state',
  'user-follow-read',
  'user-read-recently-played',
  'user-library-read',
  'user-read-private'
];

const params = {
  scope: scopes?.join(',')
};

const queryParam = new URLSearchParams(params);

const AUTHORIZATION_URL = `https://accounts.spotify.com/authorize?${queryParam.toString()}`;

const spotifyAPI = new SpotifyWebApi({
  clientId: CONFIG.CLIENT_ID,
  clientSecret: CONFIG.CLIENT_SECRET
});

export const CONFIG_SPOTIFY = {
  AUTHORIZATION_URL: AUTHORIZATION_URL,
  SPOTIFY_API: spotifyAPI
};
