/* eslint-disable no-unused-vars */
import { CONFIG_SPOTIFY } from '@Config/spotify';
import controllerPlaylists from './controller';

type IArgumentsAlbumArtist = {
  take: number;
  skip: number;
  namePlaylist: string;
};

const ResolverQueryPlaylist = {
  SpotifySearchPlaylist: async (
    _: unknown,
    { take, skip, namePlaylist }: IArgumentsAlbumArtist
  ) => {
    const searchedPlaylist = await CONFIG_SPOTIFY.SPOTIFY_API.searchPlaylists(
      namePlaylist ?? 'Red Velvet',
      {
        limit: take > 50 ? 50 : take,
        offset: skip
      }
    );

    const playlistQuery = searchedPlaylist?.body?.playlists;

    return await controllerPlaylists({
      playlists: playlistQuery?.items,
      total: playlistQuery?.total as number,
      take,
      skip
    });
  }
};

export default ResolverQueryPlaylist;
