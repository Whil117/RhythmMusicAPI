/* eslint-disable no-unused-vars */
import { CONFIG_SPOTIFY } from '@Config/spotify';
import { PlaylistModel } from '../../models/playlist';
import controllerPlaylists from './controller';

type IArgumentsAlbumArtist = {
  take: number;
  skip: number;
  namePlaylist: string;
};

type IArgumentsPlaylist = {
  playlistById: string;
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
  },
  playlistById: async (_: unknown, { playlistById }: IArgumentsPlaylist) => {
    const spotifyPlaylist = await CONFIG_SPOTIFY.SPOTIFY_API.getPlaylist(
      playlistById
    ).then((res) => res.body);

    const newPlaylistUpdate = {
      collaborative: spotifyPlaylist?.collaborative,
      description: spotifyPlaylist?.description,
      spotify_url: spotifyPlaylist?.external_urls?.spotify,
      id: spotifyPlaylist?.id,
      photo: spotifyPlaylist?.images?.[0]?.url,
      name: spotifyPlaylist?.name,
      owner: {
        name: spotifyPlaylist?.owner?.display_name,
        id: spotifyPlaylist?.owner?.id,
        type: spotifyPlaylist?.owner?.type,
        uri: spotifyPlaylist?.owner?.uri,
        spotify_url: spotifyPlaylist?.owner?.external_urls?.spotify
      },
      total_tracks: spotifyPlaylist?.tracks?.total,
      uri: spotifyPlaylist?.uri
    };

    const isExist = await PlaylistModel.findOne({
      id: playlistById
    });
    if (!isExist) {
      await PlaylistModel.create(newPlaylistUpdate);
    } else {
      await PlaylistModel.findOneAndUpdate(
        {
          id: playlistById
        },
        newPlaylistUpdate
      );
    }
    return newPlaylistUpdate;
  }
};

export default ResolverQueryPlaylist;
