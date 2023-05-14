import CONFIG from '@Config/index';
import { CONFIG_SPOTIFY } from '@Config/spotify';
import axios from 'axios';

const accessSpotify = async () => {
  const res = await axios('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization:
        'Basic ' +
        Buffer.from(CONFIG.CLIENT_ID + ':' + CONFIG.CLIENT_SECRET).toString(
          'base64'
        )
    },
    data: 'grant_type=client_credentials'
  });
  if (res.status === 200) {
    CONFIG_SPOTIFY.SPOTIFY_API.setAccessToken(res.data.access_token);
    return res.data.access_token;
  }
  return '';
};

export default accessSpotify;
