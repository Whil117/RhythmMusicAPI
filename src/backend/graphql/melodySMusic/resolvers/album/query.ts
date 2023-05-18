/* eslint-disable no-unused-vars */
import { CONFIG_SPOTIFY } from '@Config/spotify';
import { LeanDocument } from 'mongoose';
import { AlbumModel } from '../../models/album';
import { ArtistModel } from '../../models/artist';
import { IArtist } from '../artist/query';
import controllerAlbums from './controller';

type IArgumentsPagination = {
  take: number;
  skip: number;
};

type IArgumentsAlbumArtist = IArgumentsPagination & {
  artistId: string;
  order: 'ASC' | 'DESC';
  filter: {
    id: string;
    album_type: string;
    artists: IArtist[];
    available_markets: string[];
    spotify_url: string;
    photo: string;
    name: string;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    uri: string;
    createdAt: Date;
    updatedAt: Date;
  };
};

type IArgumentsAlbum = {
  albumId: string;
};

const ResolverAlbumQuery = {
  SpotifyAlbumsByArtistId: async (
    _: unknown,
    { take, skip, artistId }: IArgumentsAlbumArtist
  ) => {
    const albums = await CONFIG_SPOTIFY.SPOTIFY_API.getArtistAlbums(
      artistId ?? '0sYpJ0nCC8AlDrZFeAA7ub',
      {
        limit: take > 50 ? 50 : take,
        offset: skip
      }
    );

    const findedArtists = albums?.body;

    return await controllerAlbums({
      albums: findedArtists?.items,
      total: findedArtists?.total,
      skip,
      take
    });
  },
  albumById: async (_: unknown, { albumId }: IArgumentsAlbum) => {
    const spotifyAlbum = await CONFIG_SPOTIFY?.SPOTIFY_API?.getAlbum(
      albumId
    )?.then((res) => res?.body);

    const newUpdateAlbum = {
      id: spotifyAlbum?.id,
      album_type: spotifyAlbum?.album_type,
      artists: spotifyAlbum?.artists?.map((item) => ({
        id: item?.id,
        name: item?.name,
        spotify_url: item?.external_urls?.spotify,
        uri: item?.uri
      })),
      available_markets: spotifyAlbum?.available_markets,
      spotify_url: spotifyAlbum?.external_urls?.spotify,
      photo: spotifyAlbum?.images?.[0]?.url,
      name: spotifyAlbum?.name,
      release_date: spotifyAlbum?.release_date,
      release_date_precision: spotifyAlbum?.release_date_precision,
      total_tracks: spotifyAlbum?.total_tracks,
      uri: spotifyAlbum?.uri
    };

    const isExistAlbum = await AlbumModel.findOne({
      id: albumId
    });

    if (!isExistAlbum) {
      await AlbumModel.create(newUpdateAlbum);
    } else {
      await AlbumModel?.findOneAndUpdate(
        {
          id: albumId
        },
        newUpdateAlbum
      );
    }

    return newUpdateAlbum;
  },
  listAlbumsByArtistId: async (
    _: unknown,
    { take, skip, artistId, order, filter }: IArgumentsAlbumArtist
  ) => {
    const albums = await AlbumModel.find<SpotifyApi.AlbumObjectFull>({
      ...filter
    })
      .skip(take * skip - take)
      .limit(take)
      .where('artists.id')
      .sort({ release_date: order === 'DESC' ? -1 : 1 })
      .equals(artistId ?? '0sYpJ0nCC8AlDrZFeAA7ub')
      .lean()
      .exec();

    const totalCount = await AlbumModel.countDocuments({ ...filter })
      .where('artists.id')
      .equals(artistId ?? '0sYpJ0nCC8AlDrZFeAA7ub');

    const withArtists = await Promise.all(
      albums?.map(async (item) => ({
        ...item,
        artists: await artistsbAlbum(item)
      }))
    );

    const totalFindedArtists = withArtists?.length ?? 0;
    const totalFinded = totalCount ?? 0;
    return {
      items: withArtists,
      totalCount: totalFinded,
      pageInfo: {
        hasNextPage: totalFindedArtists + take * (skip - 1) < totalFinded,
        hasPreviousPage: skip > 1
      }
    };
  }
};
2;

const artistsbAlbum = async (
  item: LeanDocument<SpotifyApi.AlbumObjectFull>
) => {
  const artists = new Map<
    string,
    {
      id: string;
      name: string;
      photo: string;
      followers: number;
      popularity: number;
      genres: string[];
      uri: string;
      spotify_url: string;
    }
  >();

  for (const iterator of item.artists) {
    const isExist = await ArtistModel.findOne({
      id: iterator?.id
    });

    if (!isExist) {
      const artistSpotify = (
        await CONFIG_SPOTIFY.SPOTIFY_API.getArtist(iterator.id)
      ).body;
      const newArtist = {
        id: artistSpotify.id,
        name: artistSpotify.name,
        photo: artistSpotify.images?.[0]?.url,
        followers: artistSpotify?.followers?.total,
        popularity: artistSpotify?.popularity,
        genres: artistSpotify?.genres,
        uri: artistSpotify?.uri,
        spotify_url: artistSpotify?.external_urls?.spotify
      };

      ArtistModel.create(newArtist);
      artists.set(newArtist?.id, newArtist);
    }
    artists.set(isExist?.id, isExist);
  }

  return Array.from(artists.values());
};

export default ResolverAlbumQuery;
