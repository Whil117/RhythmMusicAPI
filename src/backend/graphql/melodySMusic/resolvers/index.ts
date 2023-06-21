import ResolverAlbum from './album';
import ResolverArtist from './artist';
import queriesCategoriesArtist from './categories_artist/query';
import ResolverPlaylist from './playlist';
import ResolverSearch from './search';
import ResolversTrack from './tracks';

const MainResolvers = {
  Query: {
    ...ResolverArtist.QUERY,
    ...ResolverAlbum.QUERY,
    ...ResolversTrack.QUERY,
    ...ResolverPlaylist.QUERY,
    ...ResolverSearch.QUERY,
    ...queriesCategoriesArtist
  },
  Mutation: {
    defaultMutate: () => {
      return 'DEFAULT MUTATE';
    }
  }
};

export default MainResolvers;
