const config = require('./config.json');
const infoData = require('./content/data/info.json');

module.exports = {
  //this makes the site config available to forestry cms
  siteMetadata: {
    ...config,
    infoData,
  },
  plugins: [
    'gatsby-plugin-sass',
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-yaml',

    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'src',
        path: `${__dirname}/src/`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: `${__dirname}/content/posts`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'galleries',
        path: `${__dirname}/content/galleries`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'featured_photos',
        path: `${__dirname}/content/featured_photos`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'data',
        path: `${__dirname}/content/data`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'images',
        path: `${__dirname}/content/images`,
      },
    },
    {
      resolve: 'gatsby-plugin-sharp',
      options: {
        defaultQuality: 90,
      },
    },
    `gatsby-transformer-sharp`,
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-relative-images',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 3840,
              linkImagesToOriginal: true,
              quality: 100,
            },
          },
          'gatsby-remark-normalize-paths',
        ],
      },
    },
  ],
};
