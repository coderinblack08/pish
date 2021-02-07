import React from 'react';
import { Navbar } from '../components/Navbar';

const News: React.FC = ({}) => {
  return (
    <div>
      <Navbar />
      <div className="py-20 px-5">
        <iframe
          width="620"
          height="345"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          className="mx-auto"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        ></iframe>
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-center pt-6">
          Imagine getting rick-rolled in 2021 🤭 😆
        </h1>
      </div>
    </div>
  );
};

export default News;
