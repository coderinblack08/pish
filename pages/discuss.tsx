import React from 'react';
import { Navbar } from '../components/Navbar';

const Discuss: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div className="py-36 lg:py-40 px-5 lg:px-0 md:px-10 mx-auto prose-sm lg:prose">
        <h1 className="font-serif font-bold">Don't Panic, It's Comming Soon</h1>
        <p className="transform -translate-y-4">
          The projected MVP publication dates:{' '}
          <span className="font-bold">
            November 31, 2020 - December 3, 2020
          </span>
        </p>
      </div>
    </div>
  );
};

export default Discuss;
