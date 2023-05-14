/* eslint-disable @next/next/no-page-custom-font */
import Head from 'next/head';
import { FC } from 'react';

const HeadComponent: FC = ({ children }) => {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>
      {children}
    </>
  );
};

export default HeadComponent;
