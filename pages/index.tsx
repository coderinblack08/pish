import { GetStaticProps } from 'next';
import Link from 'next/link';
import Prismic from 'prismic-javascript';
import ApiSearchResponse from 'prismic-javascript/types/ApiSearchResponse';
import React, { useEffect } from 'react';
import useSound from 'use-sound';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Navbar } from '../components/Navbar';
import { client } from '../utils/prismic-connection';

const Index: React.FC<{ articles: ApiSearchResponse }> = ({ articles }) => {
  const [play, { stop, isPlaying }] = useSound('/assets/pronounce_pish.mp3');

  useEffect(() => console.log(articles), []);

  return (
    <div>
      <div className="bg-gray-50 dark:bg-gray-900 overflow-y-hidden md:header-max-height">
        <header
          className="grid grid-wrap grid-cols-12 py-20 sm:py-0 md:h-screen md:max-h-4xl w-screen mx-auto"
          style={{ maxWidth: '1880px' }}
        >
          <div className="hidden sm:block lg:hidden absolute top-0 w-full">
            <Navbar />
          </div>
          <div className="max-w-5xl w-full mx-auto pb-0 sm:py-36 lg:p-10 flex flex-col justify-center relative h-full px-7 sm:pl-8 md:pl-16 col-span-12 lg:col-span-7">
            <div className="absolute top-0 hidden lg:block w-full">
              <Navbar />
            </div>
            <div className="space-y-3 sm:space-y-5">
              <div className="flex items-center font-serif whitespace-nowrap text-black dark:text-white">
                <h1 className="font-bold text-3xl sm:text-5xl">🎄 Pish News</h1>
                <h2 className="font-semibold text-base sm:text-xl md:text-2xl ml-3 text-coolGray-700 dark:text-coolGray-300 -mb-1">
                  /piSH/
                </h2>
                <button
                  className="ml-4 focus:outline-none -mb-1"
                  onClick={isPlaying ? () => stop() : () => play()}
                >
                  {isPlaying ? (
                    <svg
                      className="w-6 h-6 md:w-9 md:h-9 text-red-600 dark:text-gray-200"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z"
                      ></path>
                    </svg>
                  ) : (
                    <svg
                      className="w-6 h-6 md:w-9 md:h-9 text-red-600 dark:text-gray-200"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z"
                      ></path>
                    </svg>
                  )}
                </button>
              </div>
              <p className="text-base 2xl:text-lg text-gray-600 dark:text-gray-300 leading-7 sm:leading-8 2xl:leading-9 font-semibold">
                <span className="transition ease duration-300 font-bold hover:text-red-600 dark:hover:text-red-500 text-gray-800 dark:text-gray-400">
                  Exclamation.
                </span>{' '}
                used to express annoyance, <br className="hidden lg:block" />{' '}
                impatience, or disgust.
              </p>
              <div className="pt-2 sm:pt-0 md:pt-2">
                <Button size="md" href="#main">
                  Dive in
                </Button>
              </div>
              <div className="hidden sm:flex items-center justify-center">
                <a
                  href="#main"
                  className="flex items-center justify-center absolute bottom-0 mb-12 p-1 transform hover:translate-y-1.5 transition ease duration-400"
                >
                  <svg
                    className="w-4 h-4 text-gray-300"
                    stroke="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="hidden md:block relative col-span-12 lg:col-span-5">
            <img
              src="/assets/circular-city.jpg"
              alt="Photo by sergio souza on Unsplash"
              className="clip-image w-screen h-72 sm:h-96 lg:w-auto lg:max-h-4xl lg:h-screen inline-block object-cover"
            />
            <div className="absolute bottom-0 right-0 mb-4 mr-4 px-4 py-1 rounded shadow-xl bg-white bg-opacity-50 text-gray-800 font-medium">
              Image by <span className="text-red-600">Sergio Souza</span>
            </div>
          </div>
        </header>
      </div>
      <main
        className="grid grid-cols-12 gap-6 bg-white max-w-3xl lg:max-w-6xl mx-auto py-5 md:py-16 lg:py-28 px-5 sm:px-8"
        id="main"
      >
        <div className="flex items-center mb-1 transform hover:-translate-y-1 transition ease duration- col-span-12 bg-red-50 text-red-500 font-medium px-4 py-3 rounded-md">
          <svg
            className="w-5 h-5 mr-2 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-red-600 font-semibold mr-1">Note:</span> We have
          just launched and some links and pages are still under development.
          <Link href="/development-note">
            <a className="flex items-center ml-auto text-red-600 font-semibold">
              Details
              <svg
                className="w-3.5 h-3.5 ml-1.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
          </Link>
        </div>
        {articles.results.map((result, index) => (
          <Card key={result.id} index={index} result={result} />
        ))}
      </main>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const featured = await client.query(
    Prismic.Predicates.at('document.type', 'featured')
  );

  const ids = Object.values(featured.results[0].data).map((r: any) => r.id);

  const articles = await client.query(
    Prismic.Predicates.in('document.id', ids)
  );

  return {
    props: {
      articles,
    },
  };
};

export default Index;
