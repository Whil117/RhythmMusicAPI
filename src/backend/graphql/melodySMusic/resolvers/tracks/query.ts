/* eslint-disable no-unused-vars */
import { CONFIG_SPOTIFY } from '@Config/spotify';
import { AlbumModel } from '../../models/album';
import { ArtistModel } from '../../models/artist';
import { PlaylistWithTrackModel } from '../../models/playlistWithTrack';
import { TrackModel } from '../../models/track';
import { artistsbAlbum } from '../album/query';

type IArgumentsPagination = {
  take: number;
  skip: number;
  order: string;
};

type IArgumentsAlbumArtist = IArgumentsPagination & {
  albumId: string;
};
type IArgumentsPlaylist = IArgumentsPagination & {
  playlistId: string;
};
type IArgumentsTrack = {
  trackId: string;
};

type IArgumentsTracksByArtist = {
  take: number;
  skip: number;
  order: string;
  artistId: string;
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
  },
  trackById: async (_: unknown, { trackId }: IArgumentsTrack) => {
    const track = (await CONFIG_SPOTIFY.SPOTIFY_API.getTrack(trackId)).body;

    const album = (await CONFIG_SPOTIFY.SPOTIFY_API.getAlbum(track?.album?.id))
      .body;

    const constructTrack = {
      id: track?.id,
      name: track?.name,
      artists: track?.artists?.map(async (item) => {
        const artist = (await CONFIG_SPOTIFY.SPOTIFY_API.getArtist(item?.id))
          .body;

        const isExist = await ArtistModel.findOne({
          id: item?.id
        });

        const constructorArtist = {
          id: artist.id,
          name: artist?.name,
          photo: artist?.images?.[0]?.url,
          followers: artist?.followers?.total,
          popularity: artist?.popularity,
          genres: artist?.genres,
          uri: artist?.uri,
          spotify_url: artist?.external_urls?.spotify
        };

        if (!isExist) {
          await ArtistModel.create(constructorArtist);
        } else {
          await ArtistModel.findOneAndUpdate(
            {
              id: artist?.id
            },
            constructorArtist
          );
        }
        return constructorArtist;
      }),
      available_markets: track?.available_markets,
      album_id: track?.album?.id,
      album: {
        id: album?.id,
        album_type: album?.album_type,
        artists: album?.artists?.map((item) => ({
          id: item?.id,
          name: item?.name,
          spotify_url: item?.external_urls?.spotify,
          uri: item?.uri
        })),
        available_markets: album?.available_markets,
        spotify_url: album?.external_urls?.spotify,
        photo: album?.images?.[0]?.url,
        name: album?.name,
        release_date: album?.release_date,
        release_date_precision: album?.release_date_precision,
        total_tracks: album?.total_tracks,
        uri: album?.uri
      },
      disc_number: track?.disc_number,
      duration_ms: track?.duration_ms,
      explicit: track?.explicit,
      spotify_url: track?.external_urls?.spotify,
      preview_url: track?.preview_url,
      track_number: track?.track_number,
      uri: track?.uri
    };

    const trackFouded = await TrackModel.findOne({
      id: trackId
    });

    if (trackFouded) {
      await TrackModel.findOneAndUpdate(
        {
          id: trackId
        },
        constructTrack
      );
    } else {
      await TrackModel.create(constructTrack);
    }
    return constructTrack;
  },
  listTracksByArtistId: async (
    _: unknown,
    { take, skip, order, artistId }: IArgumentsTracksByArtist
  ) => {
    const tracks = await TrackModel.find()
      .skip(take * skip - take)
      .limit(take)
      .where('artists.id')
      .equals(artistId ?? '0sYpJ0nCC8AlDrZFeAA7ub')
      .sort({ release_date: order === 'DESC' ? -1 : 1 })
      .lean()
      .exec();

    const totalCount = await TrackModel.countDocuments()
      .where('artists.id')
      .equals(artistId ?? '0sYpJ0nCC8AlDrZFeAA7ub');

    const withTracks = await Promise.all(
      tracks?.map(async (item) => {
        const albumDb = await AlbumModel?.findOne({
          id: item?.album_id
        });

        const album = await (
          await CONFIG_SPOTIFY.SPOTIFY_API.getAlbum(item?.album_id)
        ).body;
        const dataAlbum = {
          id: album?.id,
          album_type: album?.album_type,
          artists: album?.artists?.map((item) => ({
            id: item?.id,
            name: item?.name,
            spotify_url: item?.external_urls?.spotify,
            uri: item?.uri
          })),
          available_markets: album?.available_markets,
          spotify_url: album?.external_urls?.spotify,
          photo: album?.images?.[0]?.url,
          name: album?.name,
          release_date: album?.release_date,
          release_date_precision: album?.release_date_precision,
          total_tracks: album?.total_tracks,
          uri: album?.uri
        };
        if (!albumDb) {
          AlbumModel.create(dataAlbum);
        }

        return {
          ...item,
          album: dataAlbum,
          artists: await artistsbAlbum(item)
        };
      })
    );
    const totalFindedArtists = tracks?.length ?? 0;
    const totalFinded = totalCount ?? 0;

    return {
      items: withTracks,
      totalCount: totalFinded,
      pageInfo: {
        hasNextPage: totalFindedArtists + take * (skip - 1) < totalFinded,
        hasPreviousPage: skip > 1
      }
    };
  },
  listTracksByAlbumId: async (
    _: unknown,
    { take, skip, order, albumId }: IArgumentsAlbumArtist
  ) => {
    const tracks = await TrackModel.find()
      .skip(take * skip - take)
      .limit(take)
      .where('album_id')
      .equals(albumId ?? '0sYpJ0nCC8AlDrZFeAA7ub')
      .sort({ release_date: order === 'DESC' ? -1 : 1 })
      .lean()
      .exec();

    const totalCount = await TrackModel.countDocuments()
      .where('album_id')
      .equals(albumId ?? '0sYpJ0nCC8AlDrZFeAA7ub');

    const withTracks = await Promise.all(
      tracks?.map(async (item) => {
        const albumDb = await AlbumModel?.findOne({
          id: item?.album_id
        });

        const album = await (
          await CONFIG_SPOTIFY.SPOTIFY_API.getAlbum(item?.album_id)
        ).body;
        const dataAlbum = {
          id: album?.id,
          album_type: album?.album_type,
          artists: album?.artists?.map((item) => ({
            id: item?.id,
            name: item?.name,
            spotify_url: item?.external_urls?.spotify,
            uri: item?.uri
          })),
          available_markets: album?.available_markets,
          spotify_url: album?.external_urls?.spotify,
          photo: album?.images?.[0]?.url,
          name: album?.name,
          release_date: album?.release_date,
          release_date_precision: album?.release_date_precision,
          total_tracks: album?.total_tracks,
          uri: album?.uri
        };
        if (!albumDb) {
          AlbumModel.create(dataAlbum);
        }

        return {
          ...item,
          album: dataAlbum,
          artists: await artistsbAlbum(item)
        };
      })
    );
    const totalFindedArtists = tracks?.length ?? 0;
    const totalFinded = totalCount ?? 0;

    return {
      items: withTracks,
      totalCount: totalFinded,
      pageInfo: {
        hasNextPage: totalFindedArtists + take * (skip - 1) < totalFinded,
        hasPreviousPage: skip > 1
      }
    };
  }
};
1;
export default ResolversTrackQuery;
