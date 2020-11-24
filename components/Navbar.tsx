import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import React from 'react';

export const Navbar: React.FC = () => {
  const { pathname } = useRouter();
  console.log(pathname);

  return (
    <nav
      className={`bg-gray-900 absolute top-0 py-8 lg:py-6 flex items-center justify-between w-full px-5 sm:px-6 md:px-10 text-gray-700 dark:text-gray-100 ${
        pathname === '/' ? 'lg:pl-0' : ''
      }`}
    >
      <ul className="flex items-center space-x-10">
        {pathname !== '/' ? (
          <li className="mr-2">
            <Link href="/">
              <a>
                <svg
                  className="w-9"
                  viewBox="0 0 46 43"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="46" height="43" rx="4" fill="#18181B" />
                  <path
                    d="M7.2 23.416C7.568 23.4 7.872 23.352 8.112 23.272C8.368 23.192 8.56 23.008 8.688 22.72C8.832 22.432 8.904 21.968 8.904 21.328V12.136C8.904 11.704 8.912 11.288 8.928 10.888C8.96 10.488 8.984 10.184 9 9.976C8.744 9.992 8.424 10.008 8.04 10.024C7.656 10.024 7.376 10.032 7.2 10.048V8.2C8.336 8.184 9.472 8.176 10.608 8.176C11.744 8.176 12.88 8.168 14.016 8.152C15.424 8.136 16.648 8.32 17.688 8.704C18.744 9.088 19.552 9.68 20.112 10.48C20.688 11.28 20.96 12.32 20.928 13.6C20.912 14.448 20.648 15.272 20.136 16.072C19.64 16.872 18.888 17.536 17.88 18.064C16.888 18.592 15.632 18.88 14.112 18.928C13.456 18.944 12.88 18.944 12.384 18.928V21.04C12.384 21.488 12.376 21.912 12.36 22.312C12.344 22.712 12.32 23.016 12.288 23.224C12.464 23.208 12.688 23.2 12.96 23.2C13.232 23.184 13.496 23.176 13.752 23.176C14.024 23.16 14.216 23.152 14.328 23.152V25H7.2V23.416ZM12.384 17.128C12.72 17.176 13.08 17.2 13.464 17.2C14.792 17.2 15.744 16.872 16.32 16.216C16.912 15.544 17.208 14.6 17.208 13.384C17.208 12.584 17.096 11.944 16.872 11.464C16.664 10.984 16.392 10.632 16.056 10.408C15.72 10.168 15.368 10.016 15 9.952C14.632 9.872 14.296 9.832 13.992 9.832C13.496 9.832 13.104 9.936 12.816 10.144C12.528 10.352 12.384 10.88 12.384 11.728V17.128ZM35.1555 25.24L27.4755 15.424C27.2675 15.152 27.0515 14.864 26.8275 14.56C26.6035 14.256 26.3795 13.944 26.1555 13.624H26.1315L26.1795 21.064C26.1795 21.496 26.1715 21.912 26.1555 22.312C26.1395 22.712 26.1155 23.016 26.0835 23.224C26.3395 23.192 26.6595 23.176 27.0435 23.176C27.4435 23.16 27.7235 23.152 27.8835 23.152V25H22.4115V23.416C22.7795 23.4 23.0835 23.352 23.3235 23.272C23.5795 23.192 23.7715 23.008 23.8995 22.72C24.0435 22.432 24.1155 21.968 24.1155 21.328L24.0675 12.136C24.0675 11.704 24.0755 11.288 24.0915 10.888C24.1075 10.488 24.1315 10.184 24.1635 9.976C23.9075 9.992 23.5795 10.008 23.1795 10.024C22.7955 10.024 22.5155 10.032 22.3395 10.048V8.2H26.1075L33.4515 17.464C33.8515 17.976 34.1795 18.416 34.4355 18.784C34.7075 19.152 34.9395 19.472 35.1315 19.744H35.1555V12.136C35.1555 11.704 35.1635 11.288 35.1795 10.888C35.1955 10.488 35.2115 10.184 35.2275 9.976C34.9715 9.992 34.6515 10.008 34.2675 10.024C33.8835 10.024 33.6035 10.032 33.4275 10.048V8.2H38.8995V9.784C38.5475 9.8 38.2435 9.848 37.9875 9.928C37.7315 10.008 37.5315 10.192 37.3875 10.48C37.2595 10.752 37.1955 11.216 37.1955 11.872V25.24H35.1555Z"
                    fill="#F4F4F5"
                  />
                  <rect
                    x="4"
                    y="32"
                    width="39"
                    height="2"
                    rx="1"
                    fill="#F4F4F5"
                  />
                  <circle cx="23" cy="33" r="5" fill="#18181B" />
                  <circle cx="23" cy="33" r="3" fill="#FAFAFA" />
                </svg>
              </a>
            </Link>
          </li>
        ) : null}
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
};
