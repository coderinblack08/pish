import React from 'react';
import useSound from 'use-sound';
import { Button } from '../components/button';

const Navbar: React.FC = () => (
  <nav className="absolute top-0 py-8 lg:py-10 flex items-center justify-between w-full px-5 sm:px-6 md:px-10 lg:pl-0 lg:pr-20 text-gray-700 dark:text-gray-100">
    <ul className="flex items-center space-x-8">
      <li className="inline-flex items-center font-sans font-medium">
        <svg
          className="w-5 h-5 mr-2"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
            clipRule="evenodd"
          />
          <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z" />
        </svg>
        Content
      </li>
      <li className="inline-flex items-center font-sans font-medium">
        <svg
          className="w-5 h-5 mr-2"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
            clipRule="evenodd"
          />
        </svg>
        About
      </li>
      <li className="inline-flex items-center font-sans font-medium">
        <svg
          className="w-5 h-5 mr-2"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clipRule="evenodd"
          />
        </svg>
        Search
      </li>
    </ul>
    <ul className="hidden sm:flex items-center space-x-6 ml-auto">
      <li>
        <button>
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </li>
      <li>
        <button>
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M5 3a1 1 0 000 2c5.523 0 10 4.477 10 10a1 1 0 102 0C17 8.373 11.627 3 5 3z" />
            <path d="M4 9a1 1 0 011-1 7 7 0 017 7 1 1 0 11-2 0 5 5 0 00-5-5 1 1 0 01-1-1zM3 15a2 2 0 114 0 2 2 0 01-4 0z" />
          </svg>
        </button>
      </li>
    </ul>
  </nav>
);

const Index: React.FC = () => {
  const [play, { stop, isPlaying }] = useSound('/assets/pronounce_pish.mp3');

  return (
    <main className="dark">
      <header className="grid grid-wrap grid-cols-12 h-screen w-screen bg-gray-50 dark:bg-gray-900">
        <div className="block lg:hidden">
          <Navbar />
        </div>
        <div className="-mt-16 sm:mt-0 pb-0 sm:py-36 lg:p-10 flex flex-col justify-center relative h-full pl-5 sm:pl-8 md:pl-16 col-span-12 lg:col-span-7">
          <div className="hidden lg:block">
            <Navbar />
          </div>
          <div className="space-y-3 sm:space-y-5">
            <div className="flex items-center font-serif whitespace-nowrap text-black dark:text-white">
              <h1 className="font-bold text-3xl sm:text-5xl md:text-6xl">
                Pish News
              </h1>
              <h2 className="font-semibold text-base sm:text-xl md:text-3xl ml-3 text-coolGray-700 dark:text-coolGray-300 -mb-1">
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
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-7 sm:leading-8 font-semibold">
              <span className="transition ease duration-300 font-bold hover:text-red-600 dark:hover:text-red-500 text-gray-800 dark:text-gray-400">
                Exclamation.
              </span>{' '}
              used to express annoyance, <br className="hidden lg:block" />{' '}
              impatience, or disgust.
            </p>
            <div className="pt-2 sm:pt-0 md:pt-2">
              <Button size="md">Dive in</Button>
            </div>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-5">
          <img
            src="/assets/circular-city.jpg"
            alt="Photo by sergio souza on Unsplash"
            className="clip-image w-screen h-72 sm:h-96 lg:w-auto lg:h-screen inline-block object-cover"
          />
        </div>
      </header>
    </main>
  );
};

export default Index;
