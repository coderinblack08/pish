import React, { useEffect } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Prismic from 'prismic-javascript';
import { Navbar } from '../../components/Navbar';
import { client } from '../../utils/prismic-connection';
import { Seperator } from '../../components/Seperator';
import { RichText } from 'prismic-reactjs';
import ReactTooltip from 'react-tooltip';

const Article: React.FC<{ slug: string; article: any }> = ({
  slug: _,
  article,
}) => {
  useEffect(() => console.log(article), []);
  return (
    <div>
      <Navbar />
      <main className="px-5">
        <h2 className="pt-32 max-w-2xl mx-auto font-serif font-black text-xl sm:text-2xl md:text-3xl text-center leading-relaxed">
          {article.title[0].text}
        </h2>
        <div className="flex items-center justify-center space-x-2 text-gray-600 mt-3 text-sm sm:text-base">
          <p className="text-red-600">By {article.author.name}</p>
          <Seperator />
          <p>{article.date}</p>
        </div>
        <div className="prose lg:prose-xl mx-auto mt-10">
          <div data-tip={article.image.alt}>
            <img
              src={article.image.url}
              alt={article.image.alt}
              className="object-cover max-w-2xl w-full h-96 mx-auto rounded-md"
            />
          </div>
          <ReactTooltip place="top" type="dark" effect="float" />
          <p className="leading-loose text-black">
            {RichText.render(article.body)}
          </p>
        </div>
      </main>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const articles = await client.query(
    Prismic.Predicates.at('document.type', 'article')
  );

  return {
    paths: articles.results.map((article) => ({
      params: { slug: article.uid },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({
  params: { slug },
}: {
  params: { slug: string };
}) => {
  const { data } = await client.getByUID('article', slug, {});
  const author = await client.getByUID('author', data.author.uid, {});

  data.author.name = author.data.name[0].text;

  return {
    props: {
      slug,
      article: data,
    },
  };
};

export default Article;
