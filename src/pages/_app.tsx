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
