import React from 'react';
import useSound from 'use-sound';
import { Button } from '../components/button';

const Navbar: React.FC = () => (
  <nav className="absolute top-0 py-8 lg:py-10 flex items-center justify-between w-full px-5 sm:px-6 md:px-10 lg:pl-0 text-gray-700 dark:text-gray-100">
    <ul className="flex items-center space-x-10">
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
              d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.724 4.78c.29.354.596.696.914 1.026a1 1 0 11-1.44 1.389c-.188-.196-.373-.396-.554-.6a19.098 19.098 0 01-3.107 3.567 1 1 0 01-1.334-1.49 17.087 17.087 0 003.13-3.733 18.992 18.992 0 01-1.487-2.494 1 1 0 111.79-.89c.234.47.489.928.764 1.372.417-.934.752-1.913.997-2.927H3a1 1 0 110-2h3V3a1 1 0 011-1zm6 6a1 1 0 01.894.553l2.991 5.982a.869.869 0 01.02.037l.99 1.98a1 1 0 11-1.79.895L15.383 16h-4.764l-.724 1.447a1 1 0 11-1.788-.894l.99-1.98.019-.038 2.99-5.982A1 1 0 0113 8zm-1.382 6h2.764L13 11.236 11.618 14z"
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
    <div>
      <div className="bg-gray-50 dark:bg-gray-900">
        <header
          className="grid grid-wrap grid-cols-12 h-screen max-h-4xl w-screen mx-auto"
          style={{ maxWidth: '1880px' }}
        >
          <div className="block lg:hidden">
            <Navbar />
          </div>
          <div className="max-w-5xl w-full mx-auto -mt-16 sm:mt-0 pb-0 sm:py-36 lg:p-10 flex flex-col justify-center relative h-full pl-5 sm:pl-8 md:pl-16 col-span-12 lg:col-span-7">
            <div className="hidden lg:block">
              <Navbar />
            </div>
            <div className="space-y-3 sm:space-y-5">
              <div className="flex items-center font-serif whitespace-nowrap text-black dark:text-white">
                <h1 className="font-bold text-3xl sm:text-5xl">Pish News</h1>
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
              <div className="flex items-center justify-center">
                <a
                  href="#main"
                  className="absolute bottom-0 pb-12 transform hover:translate-y-1.5 transition ease duration-400"
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
          <div className="relative col-span-12 lg:col-span-5">
            <img
              src="/assets/circular-city.jpg"
              alt="Photo by sergio souza on Unsplash"
              className="clip-image w-screen h-72 sm:h-96 lg:w-auto lg:max-h-4xl lg:h-screen inline-block object-cover"
            />
            <div className="absolute bottom-0 right-0 mb-3 mr-3 px-4 py-1 rounded shadow-xl bg-white bg-opacity-50 text-gray-800 font-medium">
              Image by <span className="text-red-600">Sergio Souza</span>
            </div>
          </div>
        </header>
      </div>
      <main
        className="grid grid-cols-12 gap-6 bg-white max-w-6xl mx-auto py-28"
        id="main"
      >
        <div className="col-span-7 row-span-3 cursor-pointer">
          <img
            src="https://kmph.com/resources/media/a8e0ecf8-6ec5-4d3a-8a3f-f9e76841b319-large16x9_AP20078044522655.jpg?1605824510042"
            alt="Gavin Newsom speaking"
            className="mb-7 rounded-md"
          />
          <h3 className="font-serif text-2xl font-bold text-gray-800 whitespace-pre-wrap">
            Gavin Newsom battles Coronavirus as 94% of California's counties
            reach purple tier status
          </h3>
          <p className="text-red-500 font-medium mt-3 text-base">
            By Hanzel Grimes
            <span className="text-gray-400 font-normal ml-2">
              &middot;&nbsp; 7 mins read
            </span>
          </p>
        </div>
        <div className="col-span-5 row-span-1">
          <div className="flex">
            <img
              src="https://patch.com/img/cdn20/ap/24438295/20201122/011913/styles/patch_image/public/ap-20327302438866___22130626350.jpg"
              alt="Curfew protests (Image credits: patch.com)"
              className="w-48 h-28 object-cover rounded"
            />
            <div className="ml-5">
              <h3 className="font-serif text-base font-bold text-gray-800 whitespace-pre-wrap">
                Protestors gather to defy Gov. Newsom's 10 p.m. curfew
              </h3>
              <p className="text-red-500 font-medium mt-2 text-sm">
                By Hanzel Grimes
                <span className="text-gray-400 font-normal ml-2">
                  &middot;&nbsp; 7 mins read
                </span>
              </p>
            </div>
          </div>
          <div className="col-span-5 row-span-1 mt-5">
            <div className="flex">
              <img
                src="https://patch.com/img/cdn20/ap/24438295/20201122/011913/styles/patch_image/public/ap-20327302438866___22130626350.jpg"
                alt="Curfew protests (Image credits: patch.com)"
                className="w-48 h-28 object-cover rounded"
              />
              <div className="ml-5">
                <h3 className="font-serif text-base font-bold text-gray-800 whitespace-pre-wrap">
                  Protestors gather to defy Gov. Newsom's 10 p.m. curfew
                </h3>
                <p className="text-red-500 font-medium mt-2 text-sm">
                  By Hanzel Grimes
                  <span className="text-gray-400 font-normal ml-2">
                    &middot;&nbsp; 7 mins read
                  </span>
                </p>
              </div>
            </div>
            <div className="col-span-5 row-span-1 mt-5">
              <div className="flex">
                <img
                  src="https://patch.com/img/cdn20/ap/24438295/20201122/011913/styles/patch_image/public/ap-20327302438866___22130626350.jpg"
                  alt="Curfew protests (Image credits: patch.com)"
                  className="w-48 h-28 object-cover rounded"
                />
                <div className="ml-5">
                  <h3 className="font-serif text-base font-bold text-gray-800 whitespace-pre-wrap">
                    Protestors gather to defy Gov. Newsom's 10 p.m. curfew
                  </h3>
                  <p className="text-red-500 font-medium mt-2 text-sm">
                    By Hanzel Grimes
                    <span className="text-gray-400 font-normal ml-2">
                      &middot;&nbsp; 7 mins read
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
