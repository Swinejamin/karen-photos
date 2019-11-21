const config = require('./config.json');
const infoData = require('./content/data/info.json');

module.exports = {
  //this makes the site config available to forestry cms
  siteMetadata: {
    ...config,
    infoData,
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-sharp',
      options: {
        defaultQuality: 90,
      },
    },
    `gatsby-transformer-sharp`,
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
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          // 'gatsby-remark-relative-images',
          'my-gatsby-remark-normalize-paths',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 3840,
              linkImagesToOriginal: true,
              quality: 100,
            },
          },
        ],
      },
    },
  ],
};
