/* eslint-disable no-unused-vars */
import { CONFIG_SPOTIFY } from '@Config/spotify';
import { AlbumModel } from '../../models/album';
import { ArtistModel } from '../../models/artist';
import { PlaylistModel } from '../../models/playlist';
import { TrackModel } from '../../models/track';

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

    // const includeExtension = (argument: IncludeArgument) =>
    //   includeSearch?.includes(argument);

    // if (includeExtension('album')) {
    //   const spotifyAlbums = searched?.body?.albums;
    // }
    const albums = await getExtension('album', includeSearch, async () => {
      const spotifyAlbums = searched?.body?.albums;

      const normalizeAlbum = spotifyAlbums?.items?.map((item) => ({
        id: item?.id,
        album_type: item?.album_type,
        artists: item?.artists?.map((item) => ({
          id: item?.id,
          name: item?.name,
          spotify_url: item?.external_urls?.spotify,
          uri: item?.uri
        })),
        available_markets: item?.available_markets,
        spotify_url: item?.external_urls?.spotify,
        photo: item?.images?.[0]?.url,
        name: item?.name,
        release_date: item?.release_date,
        release_date_precision: item?.release_date_precision,
        total_tracks: item?.total_tracks,
        uri: item?.uri
      }));

      for await (const iterator of normalizeAlbum ?? []) {
        const isFinded = await AlbumModel?.findOne({
          id: iterator?.id
        });
        if (!isFinded) AlbumModel.create(iterator);
      }
      const totalFindedArtists = spotifyAlbums?.items.length ?? 0;
      const totalFinded = spotifyAlbums?.total ?? 0;

      return {
        items: normalizeAlbum,
        totalCount: totalFinded,
        pageInfo: {
          hasNextPage: totalFindedArtists + take * (skip - 1) < totalFinded,
          hasPreviousPage: skip > 0
        }
      };
    });

    const artists = await getExtension('artist', includeSearch, async () => {
      const findedArtists = searched?.body?.artists;

      const normalizedArtists = findedArtists?.items?.map((iterator) => ({
        id: iterator?.id,
        name: iterator?.name,
        photo: iterator?.images?.[0]?.url,
        followers: iterator?.followers?.total,
        popularity: iterator?.popularity,
        genres: iterator?.genres,
        uri: iterator?.uri,
        spotify_url: iterator?.external_urls?.spotify
      }));

      for (const iterator of normalizedArtists ?? []) {
        const isFindedArtist = await ArtistModel?.findOne({
          id: iterator?.id
        });

        if (!isFindedArtist) ArtistModel.create(iterator);
      }

      const totalFindedArtists = findedArtists?.items.length ?? 0;
      const totalFinded = findedArtists?.total ?? 0;

      return {
        items: normalizedArtists,
        totalCount: totalFinded,
        pageInfo: {
          hasNextPage: totalFindedArtists + take * (skip - 1) < totalFinded,
          hasPreviousPage: skip > 0
        }
      };
    });

    const playlists = await getExtension(
      'playlist',
      includeSearch,
      async () => {
        const playlistQuery = searched?.body?.playlists;
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
