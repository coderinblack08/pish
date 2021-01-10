const withImages = require('next-images');
const compose = require('next-compose');
const withPWA = require('next-pwa');

module.exports = compose([
  [
    withImages,
    {
      images: {
        domains: ['images.prismic.io'],
      },
    },
  ],
  [withPWA, { pwa: { dest: 'public' } }],
]);
