/* eslint-disable no-unused-vars */
import { CONFIG_SPOTIFY } from '@Config/spotify';
import { LeanDocument, SortOrder } from 'mongoose';
import { AlbumModel } from '../../models/album';
import { ArtistModel } from '../../models/artist';
import getterFilterTracks from '../../utils';
import controllerAlbums from './controller';

type IArgumentsPagination = {
  take: number;
  skip: number;
};

type IArgumentsAlbumArtist = IArgumentsPagination & {
  artistId: string;
  order: 'ASC' | 'DESC';
  filter: {
    artistName?: string;
    artistId?: string;
    popularity: string;
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
      artists: await spotifyAlbum?.artists?.map(async (item) => {
        const artist = (await CONFIG_SPOTIFY.SPOTIFY_API.getArtist(item?.id))
          .body;

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

        const isExist = await ArtistModel.findOne({
          id: item?.id
        });

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
      album_group: spotifyAlbum?.album_group,

      available_markets: spotifyAlbum?.available_markets,
      label: spotifyAlbum?.label,
      popularity: spotifyAlbum?.popularity,
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
  listAlbums: async (
    _: unknown,
    { take, skip, order, filter }: IArgumentsAlbumArtist
  ) => {
    const constructorFilter =
      getterFilterTracks(filter ?? {}, (value) => {
        return {
          artistId: { 'artists.id': value || '0sYpJ0nCC8AlDrZFeAA7ub' },
          artistName: {
            'artists.name': { $regex: value || '', $options: 'i' }
          },
          albumName: { name: { $regex: value || '', $options: 'i' } }
        };
      }) ?? {};
    const sortfilter = filterWithPopular(filter, order);
    const albums = await AlbumModel.find<SpotifyApi.AlbumObjectFull>({
      ...constructorFilter
    })
      .skip(take * skip - take)
      .limit(take)
      .sort(sortfilter)
      .lean()
      .exec();

    const totalCount = await AlbumModel.countDocuments({
      ...constructorFilter
    });

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

export const filterWithPopular = (
  filter: IArgumentsAlbumArtist['filter'],
  order: IArgumentsAlbumArtist['order']
): {
  [key: string]: SortOrder;
} => {
  if (filter?.popularity) {
    return {
      popularity: filter?.popularity === 'POPULAR' ? -1 : 1
    };
  }
  if (order) {
    return {
      release_date: order === 'DESC' ? -1 : 1,
      createdAt: order === 'DESC' ? -1 : 1
    };
  }
  return {};
};

export const artistsbAlbum = async (
  item: LeanDocument<SpotifyApi.AlbumObjectFull | SpotifyApi.TrackObjectFull>
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

  for (const iterator of item.artists ?? []) {
    const isExist = await ArtistModel.findOne({
      id: iterator?.id
    });

    if (!isExist && iterator.id) {
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
