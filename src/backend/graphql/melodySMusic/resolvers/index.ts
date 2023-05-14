import ResolverAlbum from './album';
import ResolverArtist from './artist';
import ResolverPlaylist from './playlist';
import ResolversTrack from './tracks';

const MainResolvers = {
  Query: {
    ...ResolverArtist.QUERY,
    ...ResolverAlbum.QUERY,
    ...ResolversTrack.QUERY,
    ...ResolverPlaylist.QUERY
  },
  Mutation: {
    ...ResolverArtist.MUTATE,
    ...ResolverAlbum.MUTATE
  }
};

export default MainResolvers;
