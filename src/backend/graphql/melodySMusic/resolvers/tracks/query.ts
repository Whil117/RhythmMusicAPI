import { CONFIG_SPOTIFY } from '@Config/spotify';
import { PlaylistWithTrackModel } from '../../models/playlistWithTrack';
import { TrackModel } from '../../models/track';

type IArgumentsPagination = {
  take: number;
  skip: number;
};

type IArgumentsAlbumArtist = IArgumentsPagination & {
  albumId: string;
};
type IArgumentsPlaylist = IArgumentsPagination & {
  playlistId: string;
};
const ResolversTrackQuery = {
  SpotifyTracksAlbumById: async (
    _: unknown,
    { take, skip, albumId }: IArgumentsAlbumArtist
  ) => {
    const getAlbum = await CONFIG_SPOTIFY.SPOTIFY_API.getAlbum(
      albumId ?? '1OunRKupt1U7K8eq2NgkPZ'
    ).then((res) => res.body);

    const getTracks = await CONFIG_SPOTIFY.SPOTIFY_API.getAlbumTracks(
      albumId ?? '1OunRKupt1U7K8eq2NgkPZ',
      {
        limit: take > 50 ? 50 : take,
        offset: skip
      }
    );

    const album = {
      id: getAlbum?.id,
      album_type: getAlbum?.album_type,
      artists: getAlbum?.artists?.map((item) => {
        return {
          id: item?.id,
          name: item?.name,
          uri: item?.uri,
          spotify_url: item?.external_urls?.spotify
        };
      }),
      available_markets: getAlbum?.available_markets,
      spotify_url: getAlbum?.external_urls?.spotify,
      photo: getAlbum?.images?.[0]?.url,
      name: getAlbum?.name,
      release_date: getAlbum?.release_date,
      release_date_precision: getAlbum?.release_date_precision,
      total_tracks: getAlbum?.total_tracks,
      uri: getAlbum?.uri
    };

    const albumsTracks = getTracks?.body;

    const tracks = albumsTracks?.items?.map((item) => {
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

    for (const iterator of tracks) {
      const isExist = await TrackModel.findOne({
        id: iterator?.id
      });

      if (!isExist) await TrackModel.create(iterator);
    }

    const totalFindedArtists = albumsTracks?.items.length ?? 0;
    const totalFinded = getTracks?.body?.total ?? 0;
    return {
      items: tracks,
      totalCount: totalFinded,
      pageInfo: {
        hasNextPage: totalFindedArtists + take * (skip - 1) < totalFinded,
        hasPreviousPage: skip > 0
      }
    };
  },
  SpotifyTracksByPlaylist: async (
    _: unknown,
    { take, skip, playlistId }: IArgumentsPlaylist
  ) => {
    const getTracksWIthPlaylist =
      await CONFIG_SPOTIFY.SPOTIFY_API.getPlaylistTracks(
        playlistId ?? '5TrGetsoBQQKeC5E1LNHQn',
        {
          limit: take > 50 ? 50 : take,
          offset: skip
        }
      );

    const playlists = getTracksWIthPlaylist?.body?.items?.map((item) => {
      return {
        id: item?.track?.id,
        name: item?.track?.name,
        artists: item?.track?.artists?.map((dataItem) => {
          return {
            id: dataItem?.id,
            name: dataItem?.name,
            spotify_url: dataItem?.external_urls?.spotify,
            uri: dataItem?.uri
          };
        }),
        album: {
          id: item?.track?.album?.id,
          album_type: item?.track?.album?.album_type,
          artists: item?.track?.album?.artists?.map((item) => {
            return {
              id: item?.id,
              name: item?.name,
              uri: item?.uri,
              spotify_url: item?.external_urls?.spotify
            };
          }),
          available_markets: item?.track?.album?.available_markets,
          spotify_url: item?.track?.album?.external_urls?.spotify,
          photo: item?.track?.album?.images?.[0]?.url,
          name: item?.track?.album?.name,
          release_date: item?.track?.album?.release_date,
          release_date_precision: item?.track?.album?.release_date_precision,
          total_tracks: item?.track?.album?.total_tracks,
          uri: item?.track?.album?.uri
        },
        available_markets: item?.track?.available_markets,
        album_id: item?.track?.album?.id,
        disc_number: item?.track?.disc_number,
        duration_ms: item?.track?.duration_ms,
        explicit: item?.track?.explicit,
        spotify_url: item?.track?.external_urls?.spotify,
        preview_url: item?.track?.preview_url,
        track_number: item?.track?.track_number,
        uri: item?.track?.uri
      };
    });

    for (const iterator of playlists ?? []) {
      const isExist = await TrackModel.findOne({
        id: iterator?.id
      });

      const isExistRelation = await PlaylistWithTrackModel.findOne({
        playlistId: playlistId,
        trackId: iterator?.id
      });

      if (!isExistRelation)
        await PlaylistWithTrackModel.create({
          playlistId: playlistId,
          trackId: iterator?.id
        });

      if (!isExist) await TrackModel.create(iterator);
    }
    const totalCount = getTracksWIthPlaylist?.body?.total ?? 0;
    const totalHasNextPage = getTracksWIthPlaylist?.body?.items?.length ?? 0;
    return {
      items: playlists,
      totalCount: totalCount,
      pageInfo: {
        hasNextPage: totalHasNextPage + take * (skip - 1) < totalCount,
        hasPreviousPage: skip > 0
      }
    };
  }
};

export default ResolversTrackQuery;
