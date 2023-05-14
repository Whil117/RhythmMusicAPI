import ResolverMutateArtist from './mutate';
import ResolverQueryArtist from './query';

const ResolverArtist = {
  QUERY: ResolverQueryArtist,
  MUTATE: ResolverMutateArtist
};

export default ResolverArtist;
