import AtomSeo from '@Components/index';
import '@Styles/fonts.css';
import '@Styles/globals.css';
import '@Styles/normalize.css';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import { AtomWrapper } from '@whil/ui';
import type { AppPropsWithLayout } from 'next/app';

const client = new ApolloClient({
  // ...other arguments...
  uri: '/api/graphql',
  cache: new InMemoryCache()
});

const MyApp = ({
  Component,
  pageProps: { ...pageProps }
}: AppPropsWithLayout) => {
  return (
    <>
      <AtomSeo
        url="https://rhythmusic.whil.online/"
        title="Rhythm Music API"
        content="Node.js, Graphql, Backend, API"
        image="/coverseo2.png"
        description="The music API also provides access to an extensive music database that includes detailed information about songs, albums, artists, genres, and other related metadata. "
      />

      <ApolloProvider client={client}>
        <AtomWrapper
          padding="4rem"
          justifyContent="center"
          alignItems="center"
          customCSS={(css) => css`
            @media (max-width: 768px) {
              padding: 2em;
            }
          `}
        >
          <Component {...pageProps} />
        </AtomWrapper>
      </ApolloProvider>
    </>
  );
};

export default MyApp;
