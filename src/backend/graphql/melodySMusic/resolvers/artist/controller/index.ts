import { ArtistModel } from 'backend/graphql/melodySMusic/models/artist';
import convertArtists from '../helper';

type ControllerOptions = {
  artists?: SpotifyApi.ArtistObjectFull[];
  total: number;
  take: number;
  skip: number;
};

const controllerArtist = async ({
  artists,
  total,
  take,
  skip
}: ControllerOptions) => {
  const normalizedArtists = convertArtists(artists);

  for (const iterator of normalizedArtists ?? []) {
    if (iterator?.id) {
      const isFindedArtist = await ArtistModel?.findOne({
        id: iterator?.id
      });

      if (!isFindedArtist) await ArtistModel.create(iterator);
    }
  }

  const totalFindedArtists = normalizedArtists?.length ?? 0;
  const totalFinded = total ?? 0;

  return {
    items: normalizedArtists,
    totalCount: totalFinded,
    pageInfo: {
      hasNextPage: totalFindedArtists + take * (skip - 1) < totalFinded,
      hasPreviousPage: skip > 0
    }
  };
};

export default controllerArtist;
