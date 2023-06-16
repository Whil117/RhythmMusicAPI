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
    <ApolloProvider client={client}>
      <AtomSeo
        url="https://rhythmusic.whil.online/"
        title="Rhythm Music API"
        content="Node.js, Graphql, Backend, API"
        image="/RhtmBg.png"
        description="The music API also provides access to an extensive music database that includes detailed information about songs, albums, artists, genres, and other related metadata. This allows developers to obtain accurate and up-to-date information about the available music, which helps them create content-rich and relevant applications for music lovers."
      />
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
  );
};

export default MyApp;
