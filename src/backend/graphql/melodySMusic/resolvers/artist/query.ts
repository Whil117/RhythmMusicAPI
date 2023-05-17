/* eslint-disable no-unused-vars */
import { CONFIG_SPOTIFY } from '@Config/spotify';
import controllerArtist from './controller';

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

    return await controllerArtist({
      artists: findedArtists?.items,
      total: findedArtists?.total as number,
      take,
      skip
    });
  }
};

export default ResolverQueryArtist;
