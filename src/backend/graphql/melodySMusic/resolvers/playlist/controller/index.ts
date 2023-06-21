import { PlaylistModel } from 'backend/graphql/melodySMusic/models/playlist';
import convertPlaylists from '../helper';

type ControllerOptions = {
  playlists?: SpotifyApi.PlaylistObjectSimplified[];
  total: number;
  skip: number;
  take: number;
};

const controllerPlaylists = async ({
  playlists,
  total,
  skip,
  take
}: ControllerOptions) => {
  const dataPlaylists = convertPlaylists(playlists);

  for (const iterator of playlists ?? []) {
    if (iterator?.id) {
      const isExist = await PlaylistModel.findOne({
        id: iterator?.id
      });
      if (!isExist) await PlaylistModel.create(iterator);
    }
  }
  const totalCount = total ?? 0;
  const hasNextCount = playlists?.length ?? 0;
  return {
    items: dataPlaylists,
    totalCount: totalCount,
    pageInfo: {
      hasNextPage: hasNextCount + take * (skip - 1) < totalCount,
      hasPreviousPage: skip > 0
    }
  };
};

export default controllerPlaylists;
