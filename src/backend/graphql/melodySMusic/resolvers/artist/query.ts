/* eslint-disable no-unused-vars */
import { CONFIG_SPOTIFY } from '@Config/spotify';
import { ArtistModel } from '../../models/artist';
import getterFilterTracks from '../../utils';
import controllerArtist from './controller';

type IArgumentsSearchArtists = {
  take: number;
  skip: number;
  nameArtist: string;
};

export type IArtist = {
  id: string;
  name: string;
  photo: string;
  followers: number;
  popularity: number;
  genres: string[];
  uri: string;
  spotify_url: string;
  createdAt: Date;
  updatedAt: Date;
};

type IArgumentsArtist = {
  take: number;
  skip: number;
  order: string;
  artistId: string;
  filter: {
    artistName: string;
  };
};
const ResolverQueryArtist = {
  SpotifysearchArtistByName: async (
    _: unknown,
    { skip, take, nameArtist }: IArgumentsSearchArtists
  ) => {
    const searchArtists = await CONFIG_SPOTIFY?.SPOTIFY_API.searchArtists(
      nameArtist ?? '',
      {
        include_external: 'audio',
        limit: take > 50 ? 50 : take,
        offset: skip
      }
    );

    const findedArtists = searchArtists?.body?.artists;

    return await controllerArtist({
      artists: findedArtists?.items,
      total: findedArtists?.total as number,
      take,
      skip
    });
  },
  listArtists: async (
    _: unknown,
    { take, skip, order, filter }: IArgumentsArtist
  ) => {
    const constructorFilter =
      getterFilterTracks(filter ?? {}, (value) => {
        return {
          artistName: {
            name: { $regex: value || '', $options: 'i' }
          }
        };
      }) ?? {};
    const artits = await ArtistModel.find({
      ...constructorFilter
    })
      .skip(take * skip - take)
      .limit(take)
      // .where('id')
      // .equals(artistId ?? '0sYpJ0nCC8AlDrZFeAA7ub')
      .sort({ createdAt: order === 'DESC' ? -1 : 1 })
      .lean()
      .exec();

    const totalCount = await ArtistModel.countDocuments({
      ...constructorFilter
    });

    const totalFindedArtists = artits?.length ?? 0;
    const totalFinded = totalCount ?? 0;
    return {
      items: artits,
      totalCount: totalFinded,
      pageInfo: {
        hasNextPage: totalFindedArtists + take * (skip - 1) < totalFinded,
        hasPreviousPage: skip > 1
      }
    };
  },
  artistById: async (_: unknown, { artistId }: IArgumentsArtist) => {
    const artistDB = await ArtistModel.findOne({
      id: artistId
    });

    const spotifyArtist = await CONFIG_SPOTIFY.SPOTIFY_API.getArtist(
      artistId
    ).then((res) => res.body);

    const newArtist = {
      id: spotifyArtist.id,
      name: spotifyArtist.name,
      photo: spotifyArtist.images?.[0]?.url,
      followers: spotifyArtist.followers?.total,
      popularity: spotifyArtist.popularity,
      genres: spotifyArtist.genres,
      uri: spotifyArtist?.uri,
      spotify_url: spotifyArtist.external_urls?.spotify
    };
    if (!artistDB) {
      await ArtistModel.create(newArtist);
    } else {
      await ArtistModel?.findOneAndUpdate(
        {
          id: artistId
        },
        newArtist
      );
    }

    return newArtist;
  }
};

export default ResolverQueryArtist;
