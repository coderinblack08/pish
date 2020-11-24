import React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import '../styles/index.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Pish</title>
        <meta httpEquiv="X-UA-Compatible" content="edge" />
        <meta
          name="description"
          content="news, opinion, articles, information"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="shortcut icon"
          type="image/x-icon"
          href={require('../public/favicon.ico')}
        />
      </Head>
      <div className="antialiased box-content dark">
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
