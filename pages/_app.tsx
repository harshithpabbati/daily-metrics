import React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import '../styles/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Daily Demo</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
};
export default MyApp;
