/* eslint-disable no-unused-vars */
import { CONFIG_SPOTIFY } from '@Config/spotify';
import { PlaylistModel } from '../../models/playlist';

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
    const playlists = playlistQuery?.items?.map((item) => {
      return {
        collaborative: item?.collaborative,
        description: item?.description,
        spotify_url: item?.external_urls?.spotify,
        id: item?.id,
        photo: item?.images?.[0]?.url,
        name: item?.name,
        owner: {
          name: item?.owner?.display_name,
          id: item?.owner?.id,
          type: item?.owner?.type,
          uri: item?.owner?.uri,
          spotify_url: item?.owner?.external_urls?.spotify
        },
        total_tracks: item?.tracks?.total,
        uri: item?.uri
      };
    });

    for (const iterator of playlists ?? []) {
      const isExist = await PlaylistModel.findOne({
        id: iterator?.id
      });
      if (!isExist) await PlaylistModel.create(iterator);
    }
    const totalCount = playlistQuery?.total ?? 0;
    const hasNextCount = playlistQuery?.items?.length ?? 0;
    return {
      items: playlists,
      totalCount: totalCount,
      pageInfo: {
        hasNextPage: hasNextCount + take * (skip - 1) < totalCount,
        hasPreviousPage: skip > 0
      }
    };
  }
};

export default ResolverQueryPlaylist;

// searchPlaylists;
