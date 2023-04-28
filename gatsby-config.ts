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
    {
      resolve: 'gatsby-source-contentful',
      options: contentfulConfig,
    },
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
    'gatsby-plugin-image',
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
  ],
};

export default config;
