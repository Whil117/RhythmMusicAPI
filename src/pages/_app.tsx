/* eslint-disable @next/next/no-sync-scripts */
/* eslint-disable @next/next/no-page-custom-font */
import { Global } from '@emotion/react';
import HeadComponent from '@Styles/global/head';
import Normalize from '@Styles/global/normalize';
import type { AppPropsWithLayout } from 'next/app';
import Script from 'next/script';

const MyApp = ({
  Component,
  pageProps: { ...pageProps }
}: AppPropsWithLayout) => {
  return (
    <>
      <Script
        src="https://open.spotify.com/embed-podcast/iframe-api/v1"
        async
      />
      <script
        src="https://open.spotify.com/embed-podcast/iframe-api/v1"
        async
      ></script>
      <script src="https://open.spotifycdn.com/cdn/build/embed/embed.77d6c6a6.js"></script>
      <script src="https://open.spotifycdn.com/cdn/build/embed/vendor~embed.0e9f4f0b.js"></script>
      <HeadComponent>
        <Global styles={Normalize} />
        <Component {...pageProps} />
      </HeadComponent>
    </>
  );
};

export default MyApp;
