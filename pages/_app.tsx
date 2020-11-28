import firebase from 'firebase';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import '../styles/index.css';

if (!firebase.apps.length) {
  const firebaseConfig: any =
    process.env.NODE_ENV === 'development'
      ? {
          projectId: 'pish-8734e',
          apiKey: 'AIzaSyCREUIQufBbbSCM74M_51Y3s43xA7Uw2Dw',
          authDomain: 'http://localhost:9099?ns=emulatorui',
          databaseURL: 'http://localhost:8080?ns=emulatorui',
          storageBucket: 'pish-8734e.appspot.com',
          messagingSenderId: '946698616937',
          appId: '1:946698616937:web:4100b32f2c26b8d4c762f8',
          measurementId: 'G-FDTQXFP09S',
        }
      : {
          apiKey: 'AIzaSyCREUIQufBbbSCM74M_51Y3s43xA7Uw2Dw',
          authDomain: 'pish-8734e.firebaseapp.com',
          databaseURL: 'https://pish-8734e.firebaseio.com',
          projectId: 'pish-8734e',
          storageBucket: 'pish-8734e.appspot.com',
          messagingSenderId: '946698616937',
          appId: '1:946698616937:web:4100b32f2c26b8d4c762f8',
          measurementId: 'G-FDTQXFP09S',
        };

  firebase.initializeApp(firebaseConfig);

  if (process.env.NODE_ENV === 'development') {
    const firestore = firebase.firestore();
    const auth = firebase.auth();
    firestore.useEmulator('localhost', 8080);
    auth.useEmulator('http://localhost:9099/');
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>🦃 Pish</title>
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
