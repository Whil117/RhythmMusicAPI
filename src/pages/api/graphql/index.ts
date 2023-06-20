import ConnectMongoDB from '@Config/database';
import accessSpotify from '@Config/spotify/token';
import { KeyvAdapter } from '@apollo/utils.keyvadapter';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-micro';
import MainResolvers from 'backend/graphql/melodySMusic/resolvers';
import MainTypesDefs from 'backend/graphql/melodySMusic/types';
import Keyv from 'keyv';
import Cors from 'micro-cors';
const cors = Cors();
ConnectMongoDB();

const apolloServer = new ApolloServer({
  typeDefs: MainTypesDefs,
  resolvers: MainResolvers,
  persistedQueries: false,
  cache: new KeyvAdapter(new Keyv()),

  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  introspection: true,
  csrfPrevention: true,
  context: async ({ req }) => {
    await accessSpotify();
    return {
      req
    };
  }
});

const startServer = apolloServer.start();

export default cors(async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.end();
    return false;
  }
  await startServer;

  await apolloServer.createHandler({
    path: '/api/graphql'
  })(req, res);
});

export const config = {
  api: {
    bodyParser: false
  }
};
