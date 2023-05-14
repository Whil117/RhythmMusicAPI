/* eslint-disable no-unused-vars */
import { CONFIG_SPOTIFY } from '@Config/spotify';
import { ArtistModel } from 'backend/graphql/melodySMusic/models/artist';

type IArgumentsSearchArtists = {
  take: number;
  skip: number;
  nameArtist: string;
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
  }
  // inyectExportArtists: async () => {
  //   const data = AllArtists;
  //   for await (const iterator of data) {
  //     const artistFinded = await CONFIG_SPOTIFY?.SPOTIFY_API.getArtist(
  //       iterator?.id
  //     )?.then((res) => res.body);
  //     const isFindedArtist = await ArtistModel?.findOne({
  //       id: iterator?.id
  //     });

  //     if (!isFindedArtist) {
  //       ArtistModel.create({
  //         id: artistFinded?.id,
  //         name: artistFinded?.name,
  //         photo: artistFinded?.images?.[0]?.url,
  //         followers: artistFinded?.followers?.total,
  //         popularity: artistFinded?.popularity,
  //         genres: artistFinded?.genres,
  //         uri: artistFinded?.uri,
  //         spotify_url: artistFinded?.external_urls?.spotify
  //       });
  //     }
  //   }
  //   return 'EXPORTED ARTISTS';
  // }
};

export default ResolverQueryArtist;
