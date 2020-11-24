import React from 'react';
import Link from 'next/link';
import { slugToString } from '../utils/slugToString';

export const Card: React.FC<{ index: number; result: any }> = ({
  index,
  result,
}) => {
  if (index) {
    return (
      <Link href={`/article/${result.uid}`}>
        <a className="col-span-12 lg:col-span-5 row-span-1 mt-8 lg:mt-0">
          <div className="flex flex-col sm:flex-row">
            <img
              src={result.data.image.url}
              alt={result.data.image.alt}
              className="w-full h-48 sm:w-40 sm:h-24 object-cover rounded"
            />
            <div className="sm:ml-5 mt-5 sm:mt-0">
              <h3 className="font-serif text-lg lg:text-base font-bold text-gray-800 whitespace-pre-wrap">
                {result.data.title[0].text}
              </h3>
              <p className="text-red-500 font-medium mt-2 text-sm">
                By {slugToString(result.data.author.slug)}
                <span className="text-gray-400 font-normal ml-2">
                  &middot;&nbsp; 7 mins read
                </span>
              </p>
            </div>
          </div>
        </a>
      </Link>
    );
  }

  return (
    <Link href={`/article/${result.uid}`}>
      <a className="col-span-12 lg:col-span-7 row-span-3 cursor-pointer">
        <img
          src={result.data.image.url}
          alt={result.data.image.alt}
          className="mb-7 rounded-md max-w-3xl w-full object-cover shadow-inner"
          style={{ maxHeight: '23.5rem' }}
        />
        <h3 className="font-serif text-lg sm:text-xl md:text-2xl font-bold text-gray-800 whitespace-pre-wrap">
          {result.data.title[0].text}
        </h3>
        <p className="text-red-500 font-medium mt-2 sm:mt-3 text-sm sm:text-base">
          By {slugToString(result.data.author.slug)}
          <span className="text-gray-400 font-normal ml-2">
            &middot;&nbsp; 7 mins read
          </span>
        </p>
      </a>
    </Link>
  );
};
