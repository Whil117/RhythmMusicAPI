import { CLIENT_ID, CLIENT_SECRET } from 'config/spotify';
import { NextApiRequest } from 'next';
import SpotifyWebApi from 'spotify-web-api-node';

type SpotifyToken = {
  accessToken: string;
  refreshToken: string;
};

export default async function refeshToken(
  token: SpotifyToken,
  req: NextApiRequest
) {
  try {
    const spotifyAPI = new SpotifyWebApi({
      clientId: req.cookies?.CLIENT_ID ?? CLIENT_ID,
      clientSecret: req.cookies?.CLIENT_SECRET ?? CLIENT_SECRET
    });
    spotifyAPI.setAccessToken(token.accessToken);
    spotifyAPI.setRefreshToken(token.refreshToken);
    const data = await spotifyAPI.refreshAccessToken();
    return {
      ...token,
      accessToken: data.body.access_token ?? token.accessToken,
      refreshToken: data.body.refresh_token ?? token.refreshToken,
      accessTokenExpires: Date.now() + data.body.expires_in * 1000
    };
  } catch (error) {
    return {
      ...token,
      error: 'Refresh Token'
    };
  }
}
