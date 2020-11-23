import React from 'react';
import useSound from 'use-sound';
import { Button } from '../components/button';

const Index: React.FC = () => {
  const [play, { stop, isPlaying }] = useSound('/assets/pronounce_pish.mp3');

  return (
    <main>
      <header className="grid grid-cols-12 h-screen">
        <div className="p-10 flex flex-col justify-center relative h-full pl-16 col-span-7">
          <nav className="absolute top-0 py-10 flex items-center justify-between text-gray-900 dark:text-gray-100">
            <ul className="flex items-center space-x-8">
              <li className="inline-flex items-center font-serif font-semibold">
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
              <li className="inline-flex items-center font-serif font-semibold">
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
              <li className="inline-flex items-center font-serif font-semibold">
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
          </nav>
          <div className="space-y-5">
            <div className="flex items-center font-serif whitespace-nowrap text-black dark:text-white">
              <h1 className="font-bold text-6xl">Pish News</h1>
              <h2 className="font-semibold text-3xl ml-3 text-gray-700 dark:text-gray-300 -mb-0.5">
                /piSH/
              </h2>
              <button
                className="ml-4 focus:outline-none"
                onClick={isPlaying ? () => stop() : () => play()}
              >
                {isPlaying ? (
                  <svg
                    className="w-9 h-9 text-gray-200"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    className="w-9 h-9 text-gray-200"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                )}
              </button>
            </div>
            <p className="text-lg text-gray-800 dark:text-gray-200 leading-relaxed">
              <span className="text-gray-600 dark:text-gray-400">
                Exclamation.
              </span>{' '}
              used to express annoyance, <br className="hidden md:block" />{' '}
              impatience, or disgust.
            </p>
            <div className="pt-3">
              <Button size="md">Dive in</Button>
            </div>
          </div>
        </div>
        <div className="col-span-5">
          <img
            src="/assets/circular-city.jpg"
            alt="Photo by sergio souza on Unsplash"
            className="h-screen inline-block object-cover"
            style={{ clipPath: 'polygon(100% 0, 100% 100%, 10% 100%, 0 0)' }}
          />
        </div>
      </header>
    </main>
  );
};

export default Index;
