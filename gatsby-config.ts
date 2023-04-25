// developers should create a .env file locally
// the build server will provide a .env during build time
import 'dotenv/config';

import type { GatsbyConfig } from 'gatsby';
import path from 'path';
import sass from 'sass';

const contentfulConfig = {
  spaceId: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  host: process.env.CONTENTFUL_HOST,
};

const { spaceId, accessToken } = contentfulConfig;

if (!spaceId || !accessToken) {
  throw new Error(
    'Contentful spaceId and the access token need to be provided.',
  );
}

const config: GatsbyConfig = {
  plugins: [
    'gatsby-plugin-tsconfig-paths',
    {
      resolve: 'gatsby-source-contentful',
      options: contentfulConfig,
    },
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        implementation: sass,
      },
    },
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-plugin-page-creator',
      options: {
        path: path.join(__dirname, 'src', 'pages'),
        ignore: [
          'templates/**/*',
          'previews/**/*',
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/favicon.ico',
      },
    },
    {
      resolve: 'gatsby-plugin-sharp',
      options: {
        defaults: {
          quality: 100,
          placeholder: 'blurred',
          breakpoints: [600, 900, 1280],
        },
      },
    },
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: path.join(__dirname, 'src', 'images'),
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'fonts',
        path: path.join(__dirname, 'src', 'styles', 'fonts'),
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              showLineNumbers: true,
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-schema-snapshot',
      options: {
        path: 'schema.gql',
        exclude: {
          plugins: ['gatsby-source-npm-package-search'],
        },
        update: false,
      },
    },
    'gatsby-plugin-image',
    {
      resolve: 'gatsby-plugin-gatsby-cloud',
      options: {
        allPageHeaders: [
          'Strict-Transport-Security: max-age=63072000; includeSubDomains; preload',
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-csp-nonce',
      options: {
        enableLogs: false,
      },
    },
  ],
};

export default config;
