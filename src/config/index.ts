const CONFIG = {
  GRAPHQL_URL:
    process.env.NEXT_PUBLIC_GRAPHQL_SERVER_URL ||
    'http://localhost:3000/api/graphql',
  MONGODB: process.env.MONGODB_URI as string,
  CLIENT_ID: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID as string,
  CLIENT_SECRET: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET as string,
  AUTH_SECRET: process.env.NEXTAUTH_SECRET
};

export default CONFIG;
