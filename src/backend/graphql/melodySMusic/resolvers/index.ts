import ResolverAlbum from './album';
import ResolverArtist from './artist';
import ResolverPlaylist from './playlist';
import ResolverSearch from './search';
import ResolversTrack from './tracks';

const MainResolvers = {
  Query: {
    ...ResolverArtist.QUERY,
    ...ResolverAlbum.QUERY,
    ...ResolversTrack.QUERY,
    ...ResolverPlaylist.QUERY,
    ...ResolverSearch.QUERY
  },
  Mutation: {
    defaultMutate: () => {
      return 'DEFAULT MUTATE';
    }
  }
};

export default MainResolvers;
