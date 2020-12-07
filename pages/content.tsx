import React from 'react';
import { GetStaticProps } from 'next';
import Prismic from 'prismic-javascript';
import { Card } from '../components/Card';
import { Navbar } from '../components/Navbar';
import { client } from '../utils/prismic-connection';
import { v4 } from 'uuid';

const Content: React.FC<{ articles: any }> = ({ articles }) => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-5 sm:px-0 py-10 md:py-12">
        <div className="w-10 h-1 bg-red-500 rounded-full mb-2" />
        <h1 className="text-2xl font-serif font-bold">Latest Publications</h1>
        <ul className="flex flex-wrap mt-8">
          {articles.results.map((data: any) => (
            <div
              className="mb-10 mr-3 max-w-sm md:max-w-xs"
              key={data.data.uid}
            >
              <Card key={data.id} type="display" result={data} />
            </div>
          ))}
          <li
            className="mb-10 mr-3 max-w-sm md:max-w-xs flex items-center pt-16 w-full flex-col"
            style={{ minHeight: '20rem' }}
            key={v4()}
          >
            <a
              href="mailto:pishnews@gmail.com"
              className="text-lg font-bold font-serif hover:text-gray-800 hover:underline"
            >
              Contribute your articles!
            </a>
            <p className="text-red-600">Restrictions may apply</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  console.log(params);

  const articles = await client.query(
    Prismic.Predicates.at('document.type', 'article')
    // Prismic.Predicates.fulltext('document', 'Trump')
    // { pageSize: 20 }
  );

  console.log(articles);

  return {
    props: {
      articles,
    },
  };
};

export default Content;
