import firebase from 'firebase';
import 'firebase/storage';
import { DefaultSeo } from 'next-seo';
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
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <DefaultSeo
        title="Pish News"
        description="Delivering accurate, justifiable news daily."
        canonical="https://pish.now.sh"
        openGraph={{
          type: 'website',
          locale: 'en_IE',
          url: 'https://pish.now.sh',
          title: 'Pish News',
          description: 'Delivering accurate, justifiable news daily.',
          images: [
            {
              url:
                process.env.NODE_ENV === 'production'
                  ? 'https://pish.now.sh/assets/pish.jpg'
                  : 'http://localhost:3001/assets/pish.jpg',
              alt: 'Pish news',
              height: 500,
              width: 500,
            },
          ],
        }}
        twitter={{
          handle: ' @pishnews',
          site: '@pishnews',
          cardType: 'summary_large_image',
        }}
      />
      <div className="antialiased box-content dark">
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
