import React from 'react';
import Link from 'next/link';
import { slugToString } from '../utils/slugToString';

interface CardProps {
  index?: number;
  type?: string;
  result: any;
}

export const Card: React.FC<CardProps> = ({ index = 0, result, type }) => {
  if (index) {
    return (
      <Link href={`/article/${result.uid}`}>
        <a className="col-span-12 lg:col-span-5 row-span-1 mt-8  lg:mt-0">
          <div className="flex flex-col sm:flex-row">
            <img
              src={result.data.image.url}
              alt={result.data.image.alt}
              title={result.data.image.alt}
              className="w-full h-48 sm:w-40 sm:h-24 object-cover rounded"
            />
            <div className="sm:ml-5 mt-5 sm:mt-0">
              <h3 className="font-serif text-lg lg:text-base font-bold text-gray-800 whitespace-pre-wrap">
                {result.data.title[0].text}
              </h3>
              <p className="text-red-500 font-medium mt-2 text-sm">
                By {slugToString(result.data.author.slug)}
                <span className="text-gray-400 font-normal ml-2">
                  &middot;&nbsp; {result.data.read_time} min
                  {result.data.read_time > 1 ? 's' : ''} read
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
          title={result.data.image.alt}
          className={`rounded-md max-w-3xl w-full object-cover shadow-inner ${
            type === 'display' ? 'h-44 mb-5' : 'mb-7'
          }`}
          style={{ maxHeight: '23.5rem' }}
        />
        <h3
          className={`font-serif text-lg ${
            type === 'display'
              ? 'sm:text-base md:text-lg'
              : 'sm:text-xl md:text-2xl'
          } font-bold text-gray-800 whitespace-pre-wrap`}
        >
          {result.data.title[0].text}
        </h3>
        <p
          className={`text-red-500 font-medium ${
            type === 'display'
              ? 'text-xs sm:text-sm mt-1 sm:mt-1.5'
              : 'text-sm sm:text-base mt-2 sm:mt-3'
          }`}
        >
          By {slugToString(result.data.author.slug)}
          <span className="text-gray-400 font-normal ml-2">
            &middot;&nbsp; {result.data.read_time} min
            {result.data.read_time > 1 ? 's' : ''} read
          </span>
        </p>
      </a>
    </Link>
  );
};
