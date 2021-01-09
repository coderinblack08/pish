import { GetStaticPaths, GetStaticProps } from 'next';
import Prismic from 'prismic-javascript';
import { RichText } from 'prismic-reactjs';
import React, { useEffect } from 'react';
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
} from 'react-share';
import ReactTooltip from 'react-tooltip';
import { Navbar } from '../../components/Navbar';
import { Separator } from '../../components/Separator';
import { client } from '../../utils/prismic-connection';
import { NewsArticleJsonLd, NextSeo } from 'next-seo';

const Article: React.FC<{ slug: string; article: any; tags: string[] }> = ({
  slug,
  article,
  tags,
}) => {
  useEffect(() => console.log(article), []);

  return (
    <div>
      <NextSeo
        title={article.title[0].text}
        canonical={`https://pish.now.sh/article/${slug}`}
        openGraph={{
          type: 'article',
          article: {
            publishedTime: article.date,
          },
          url: `https://pish.now.sh/article/${slug}`,
          title: article.title[0].text,
          images: [
            {
              url: article.image.url,
              alt: article.image.alt,
            },
          ],
        }}
      />
      <NewsArticleJsonLd
        url={`https://pish.now.sh/article/${slug}`}
        title={article.title[0].text}
        images={[article.image.url]}
        section="news"
        keywords={tags.join(',')}
        datePublished={article.date}
        authorName={article.author.name}
        publisherName="Pish News"
        publisherLogo={
          process.env.NODE_ENV === 'production'
            ? 'https://pish.now.sh/assets/pish.jpg'
            : 'http://localhost:3001/assets/pish.jpg'
        }
        description={article.title[0].text}
        body={article.body}
        dateCreated={article.date}
      />
      <Navbar />
      <main className="px-5">
        <h2 className="pt-12 max-w-2xl mx-auto font-serif font-black text-xl sm:text-2xl md:text-3xl text-center">
          {article.title[0].text}
        </h2>
        <div className="flex items-center justify-center space-x-2 text-gray-600 mt-3 text-sm sm:text-base">
          <p className="text-red-600">By {article.author.name}</p>
          <Separator />
          <p>{article.date}</p>
          <Separator />
          <p>
            {article.read_time} minute{article.read_time > 1 ? 's' : ''} read
          </p>
        </div>
        <div className="flex justify-center pt-5 mb-12">
          <div className="flex items-center space-x-2">
            <FacebookShareButton
              url={process.browser ? window.location.href : ''}
              hashtag="pishnews"
              quote="Check it out:"
            >
              <button className="inline-flex items-center justify-center w-11 h-11 bg-blue-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 hover:bg-blue-500 transition ease duration-200">
                <svg
                  width="27"
                  height="27"
                  viewBox="0 0 27 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.26489 11.5618V15.9577H11.5618V23.6506H15.9578V15.9577H19.2547L20.3537 11.5618H15.9578V9.36386C15.9578 9.07239 16.0735 8.79286 16.2796 8.58677C16.4857 8.38067 16.7653 8.26488 17.0567 8.26488H20.3537V3.86896H17.0567C15.5994 3.86896 14.2018 4.44788 13.1713 5.47838C12.1408 6.50887 11.5618 7.90652 11.5618 9.36386V11.5618H8.26489Z"
                    fill="#EFF6FF"
                  />
                </svg>
              </button>
            </FacebookShareButton>
            <TwitterShareButton
              url={process.browser ? window.location.href : ''}
              title="Check it out:"
              hashtags={['pishnews', ...tags.map((t) => t.replace(/\s/g, ''))]}
            >
              <button className="inline-flex items-center justify-center w-11 h-11 bg-lightBlue-500 rounded-full focus:outline-none focus:ring-2 focus:ring-lightBlue-300 hover:bg-lightBlue-400 transition ease duration-200">
                <svg
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.1161 4.40628C21.1545 4.87747 20.2121 5.06883 19.2313 5.35827C18.1533 4.14184 16.5551 4.07452 15.0194 4.64957C13.4837 5.22461 12.4779 6.63048 12.5 8.2431V9.20471C9.37958 9.28452 6.60053 7.86326 4.80713 5.35827C4.80713 5.35827 0.785681 12.5059 8.65356 15.936C6.85343 17.1351 5.05811 17.9438 2.88391 17.8592C6.06491 19.593 9.53151 20.1892 12.5327 19.3179C15.9752 18.3179 18.8043 15.7379 19.89 11.8732C20.2138 10.6978 20.3746 9.48344 20.3679 8.26425C20.366 8.02481 21.8199 5.59867 22.1161 4.40532V4.40628Z"
                    fill="#F0F9FF"
                  />
                </svg>
              </button>
            </TwitterShareButton>
            <EmailShareButton
              subject="Pish News Article"
              body="Check it out"
              url={process.browser ? window.location.href : ''}
            >
              <button className="inline-flex items-center justify-center w-11 h-11 bg-gray-500 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-300 hover:bg-gray-400 transition ease duration-200">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.9421 3.49621C12.8462 3.30479 12.6989 3.14384 12.5167 3.03136C12.3345 2.91888 12.1246 2.85931 11.9105 2.85931C11.6964 2.85931 11.4865 2.91888 11.3043 3.03136C11.1221 3.14384 10.9748 3.30479 10.8789 3.49621L2.80135 19.6512C2.70113 19.8515 2.66137 20.0767 2.68691 20.2992C2.71246 20.5217 2.80222 20.732 2.94524 20.9044C3.08826 21.0768 3.27835 21.2038 3.49233 21.27C3.70631 21.3362 3.93493 21.3386 4.1503 21.2771L9.91995 19.6281C10.1611 19.5592 10.3732 19.4135 10.5242 19.2132C10.6751 19.0129 10.7567 18.7689 10.7565 18.5181V13.2435C10.7565 12.9374 10.8781 12.6439 11.0945 12.4275C11.3109 12.2111 11.6044 12.0895 11.9105 12.0895C12.2165 12.0895 12.51 12.2111 12.7264 12.4275C12.9428 12.6439 13.0644 12.9374 13.0644 13.2435V18.5181C13.0643 18.7689 13.1459 19.0129 13.2968 19.2132C13.4478 19.4135 13.6599 19.5592 13.901 19.6281L19.6707 21.276C19.886 21.3376 20.1145 21.3353 20.3285 21.2693C20.5425 21.2032 20.7327 21.0763 20.8758 20.9041C21.019 20.7319 21.1089 20.5217 21.1346 20.2992C21.1603 20.0767 21.1208 19.8516 21.0208 19.6512L12.9432 3.49621H12.9421Z"
                    fill="#FAFAFA"
                  />
                </svg>
              </button>
            </EmailShareButton>
          </div>
        </div>
        <div className="prose lg:prose-xl mx-auto mt-10">
          <div data-tip={article.image.alt} data-for="image-tooltip">
            <img
              src={article.image.url}
              alt={article.image.alt}
              className="object-cover max-w-2xl w-full h-96 mx-auto rounded-md"
            />
          </div>
          <ReactTooltip
            place="top"
            type="dark"
            className="bg-gray-900 bg-opacity-90 text-white"
            effect="float"
            id="image-tooltip"
          />
          <p className="leading-loose text-black pb-3">
            {RichText.render(article.body)}
          </p>
          <div className="flex items-center pb-6">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
              />
            </svg>
            <span className="text-gray-800 text-lg">
              Tags: {tags.join(', ')}
            </span>
          </div>
          <div className="pb-20" />
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
  const { data, tags } = await client.getByUID('article', slug, {});
  const author = await client.getByUID('author', data.author.uid, {});

  data.author.name = author.data.name[0].text;

  return {
    props: {
      slug,
      tags,
      article: data,
    },
  };
};

export default Article;
