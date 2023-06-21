import { CategoriesModelArtist } from '../../models/categories_artist';
import getterFilterTracks from '../../utils';
import { filterWithPopular } from '../album/query';

type IArgumentsAlbumArtist = {
  take: number;
  skip: number;
  filter: {
    label: 'DESC' | 'ASC';
  };
};

const queriesCategoriesArtist = {
  listCategoriesArtist: async (
    _: unknown,
    { take, skip, filter }: IArgumentsAlbumArtist
  ) => {
    const sortfilter = filterWithPopular(filter);
    const constructorFilter =
      getterFilterTracks(filter ?? {}, (value) => {
        return {
          labelName: {
            label: { $regex: value || '', $options: 'i' }
          }
        };
      }) ?? {};

    const categories = await CategoriesModelArtist.find({
      ...constructorFilter
    })
      .skip(take * skip - take)
      .limit(take)
      .sort(sortfilter)
      .lean()
      .exec();

    const totalCount = await CategoriesModelArtist.countDocuments({
      ...constructorFilter
    });

    return {
      items: categories,
      totalCount: totalCount,
      pageInfo: {
        hasNextPage: categories.length + take * (skip - 1) < totalCount,
        hasPreviousPage: skip > 1
      }
    };
  }
};

export default queriesCategoriesArtist;
