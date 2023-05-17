/* eslint-disable no-unused-vars */
import { CONFIG_SPOTIFY } from '@Config/spotify';
import { TrackModel } from '../../models/track';
import controllerAlbums from '../album/controller';
import controllerArtist from '../artist/controller';
import controllerPlaylists from '../playlist/controller';

type IncludeArgument = 'album' | 'artist' | 'playlist' | 'track';

type IArgumentsSearch = {
  includeSearch: IncludeArgument[];
  search: string;
  take: number;
  skip: number;
};

const ResolverSearchQuery = {
  SpotifySearch: async (
    _: unknown,
    { skip, take, search, includeSearch }: IArgumentsSearch
  ) => {
    const searched = await CONFIG_SPOTIFY.SPOTIFY_API.search(
      search ?? 'Joy Blue Night Song',
      includeSearch,
      {
        limit: take > 50 ? 50 : take,
        offset: skip
      }
    );

    const albums = await getExtension('album', includeSearch, async () => {
      const spotifyAlbums = searched?.body?.albums;

      return await controllerAlbums({
        albums: spotifyAlbums?.items,
        total: spotifyAlbums?.total as number,
        skip,
        take
      });
    });

    const artists = await getExtension('artist', includeSearch, async () => {
      const findedArtists = searched?.body?.artists;

      return await controllerArtist({
        artists: findedArtists?.items,
        total: findedArtists?.total as number,
        take,
        skip
      });
    });

    const playlists = await getExtension(
      'playlist',
      includeSearch,
      async () => {
        const playlistQuery = searched?.body?.playlists;

        return await controllerPlaylists({
          playlists: playlistQuery?.items,
          total: playlistQuery?.total as number,
          skip,
          take
        });
      }
    );

    const tracks = await getExtension('track', includeSearch, async () => {
      const albumsTracks = searched?.body?.tracks;

      const tracks = albumsTracks?.items?.map((item) => {
        const album = {
          id: item?.album?.id,
          album_type: item?.album?.album_type,
          artists: item?.album?.artists?.map((item) => {
            return {
              id: item?.id,
              name: item?.name,
              uri: item?.uri,
              spotify_url: item?.external_urls?.spotify
            };
          }),
          available_markets: item?.album?.available_markets,
          spotify_url: item?.album?.external_urls?.spotify,
          photo: item?.album?.images?.[0]?.url,
          name: item?.album?.name,
          release_date: item?.album?.release_date,
          release_date_precision: item?.album?.release_date_precision,
          total_tracks: item?.album?.total_tracks,
          uri: item?.album?.uri
        };

        return {
          id: item?.id,
          name: item?.name,
          artists: item?.artists?.map((dataItem) => ({
            id: dataItem?.id,
            name: dataItem?.name,
            spotify_url: dataItem?.external_urls?.spotify,
            uri: dataItem?.uri
          })),
          album: album,
          available_markets: item?.available_markets,
          album_id: album?.id,
          disc_number: item?.disc_number,
          duration_ms: item?.duration_ms,
          explicit: item?.explicit,
          spotify_url: item?.external_urls?.spotify,
          preview_url: item?.preview_url,
          track_number: item?.track_number,
          uri: item?.uri
        };
      });

      for (const iterator of tracks ?? []) {
        const isExist = await TrackModel.findOne({
          id: iterator?.id
        });

        if (!isExist) await TrackModel.create(iterator);
      }

      const totalFindedArtists = albumsTracks?.items.length ?? 0;
      const totalFinded = albumsTracks?.total ?? 0;
      return {
        items: tracks,
        totalCount: totalFinded,
        pageInfo: {
          hasNextPage: totalFindedArtists + take * (skip - 1) < totalFinded,
          hasPreviousPage: skip > 0
        }
      };
    });

    return {
      albums,
      tracks,
      playlists,
      artists
    };
  }
};

const getExtension = async <T>(
  argument: IncludeArgument,
  includeSearch: IncludeArgument[],
  callBack: () => T
) => {
  if (includeSearch?.includes(argument)) {
    return await callBack?.();
  }
};

export default ResolverSearchQuery;
