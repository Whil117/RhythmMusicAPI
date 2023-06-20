import { AlbumModel } from 'backend/graphql/melodySMusic/models/album';
import convertAlbums from '../helper';

type ControllerOptions = {
  albums?: SpotifyApi.AlbumObjectSimplified[];
  total: number;
  skip: number;
  take: number;
};

const controllerAlbums = async ({
  albums,
  take,
  skip,
  total
}: ControllerOptions) => {
  const normalizeAlbum = await convertAlbums(albums);

  for await (const iterator of normalizeAlbum ?? []) {
    const isFinded = await AlbumModel?.findOne({
      id: iterator?.id
    });
    if (!isFinded) await AlbumModel.create(iterator);
  }

  const totalFindedArtists = albums?.length ?? 0;
  const totalFinded = total ?? 0;
  return {
    items: normalizeAlbum,
    totalCount: totalFinded,
    pageInfo: {
      hasNextPage: totalFindedArtists + take * (skip - 1) < totalFinded,
      hasPreviousPage: skip > 0
    }
  };
};

export default controllerAlbums;
