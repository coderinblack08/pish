import React from 'react';
import { Navbar } from '../components/Navbar';

const Note: React.FC = () => (
  <div>
    <Navbar />
    <div className="max-w-prose mx-auto py-12">
      <h1 className="font-serif text-2xl md:text-3xl font-bold mb-3">
        Development Note
      </h1>
      <p className="text-red-600 txt-sm md:text-base">Last Updated 12/3/2020</p>
      <div className="prose mt-4">
        <p>
          Here is the current status of my project, Pish News (maintained by
          coderinblack, aka Hansel Grimes). We are open source as well as open
          to public suggestions and contributions! My time and effort is just
          not enough to make Pish what it can be. This is why I need your help.
          Whether it is opening a{' '}
          <a target="_blank" href="https://github.com/coderinblack08/pish">
            pull request
          </a>{' '}
          or helping write a news/opinion piece, anything helps! If you are
          looking forward to writing a piece for us, please follow this{' '}
          <a
            target="_blank"
            href="https://docs.google.com/document/d/1ynYsI9wkRh5WwLCsnidtffj3_QYif7tFFQ0m0DTkDSs/view"
          >
            format
          </a>
          .
        </p>
        <p>
          Currently, our articles are working and content is being displayed.
          The MVP of the discuss feature is also out, with new features such as
          bug fixes, file uploads, pagination, forums, and more coming soon!
          What we are working on is
          <ul>
            <li>Liking articles</li>
            <li>Comment section</li>
            <li>Share to social media</li>
            <li>Integrated contributions page</li>
            <li>Subscriptions to unlock premium content</li>
            <li>And more!</li>
          </ul>
        </p>
        <p>
          I hope this gave you a quick peek at what we are doing at Pish News!
        </p>
      </div>
    </div>
  </div>
);

export default Note;
