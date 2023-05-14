/* eslint-disable @next/next/no-sync-scripts */
/* eslint-disable @next/next/no-page-custom-font */
import { Global } from '@emotion/react';
import HeadComponent from '@Styles/global/head';
import Normalize from '@Styles/global/normalize';
import { Provider } from 'jotai';
import { SessionProvider } from 'next-auth/react';
import type { AppPropsWithLayout } from 'next/app';
import Script from 'next/script';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
const MyApp = ({
  Component,
  pageProps: { session, ...pageProps }
}: AppPropsWithLayout) => {
  return (
    <Provider>
      <ToastContainer />
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
      <SessionProvider session={session}>
        <HeadComponent>
          <Global styles={Normalize} />
          <Component {...pageProps} />
        </HeadComponent>
      </SessionProvider>
    </Provider>
  );
};

export default MyApp;
