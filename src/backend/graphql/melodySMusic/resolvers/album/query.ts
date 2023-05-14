/* eslint-disable no-unused-vars */
import { CONFIG_SPOTIFY } from '@Config/spotify';
import { AlbumModel } from '../../models/album';
import { ArtistModel } from '../../models/artist';

type IArgumentsAlbumArtist = {
  take: number;
  skip: number;
  artistId: string;
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
    const normalizeAlbum = findedArtists?.items?.map((item) => ({
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

    const totalFindedArtists = findedArtists?.items.length ?? 0;
    const totalFinded = findedArtists?.total ?? 0;
    return {
      items: normalizeAlbum,
      totalCount: totalFinded,
      pageInfo: {
        hasNextPage: totalFindedArtists + take * (skip - 1) < totalFinded,
        hasPreviousPage: skip > 0
      }
    };
  },
  listAlbums: async () => {
    const albums = await AlbumModel.find()
      .where('artists')
      .in(['0sYpJ0nCC8AlDrZFeAA7ub'])
      .lean()
      .exec();

    const withArtists = await Promise.all(
      albums?.map(async (item) => ({
        ...item,
        artists: await ArtistModel.find({
          id: {
            $in: item.artists
          }
        }).exec()
      }))
    );

    return withArtists;
  }
};

export default ResolverAlbumQuery;
