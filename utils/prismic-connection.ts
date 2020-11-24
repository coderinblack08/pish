import Prismic from 'prismic-javascript';

export const apiEndpoint = 'https://pish.cdn.prismic.io/api/v2';
export const accessToken = process.env.PRISMIC_TOKEN!;

export const client = Prismic.client(apiEndpoint, { accessToken });
