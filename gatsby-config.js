const config = require('./config');
const plugins = [
  {
    resolve: `gatsby-plugin-sharp`,
    options: {
      // Defaults used for gatsbyImageData and StaticImage
      defaults: {},
      // Relates to "options.failOn" in https://sharp.pixelplumbing.com/api-constructor#parameters
      failOn: `warning`,
    },
  },
  {
    resolve: `gatsby-plugin-layout`,
    options: {
      component: require.resolve(`./src/templates/docs.js`),
    },
  },

  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'docs',
      path: `${__dirname}/content/`,
    },
  },
  {
    resolve: 'gatsby-plugin-mdx',
    options: {
      gatsbyRemarkPlugins: [
        {
          resolve: 'gatsby-remark-images',
          options: {
            maxWidth: 1035,
            sizeByPixelDensity: true,
          },
        },
        {
          resolve: 'gatsby-remark-copy-linked-files',
        },
      ],
      extensions: ['.mdx', '.md'],
    },
  },
];

plugins.push('gatsby-plugin-remove-serviceworker');

module.exports = {
  trailingSlash: 'always',
  pathPrefix: config.gatsby.pathPrefix,
  plugins: plugins,
  flags: {
    DEV_SSR: false,
    FAST_DEV: false, // Enable all experiments aimed at improving develop server start time
    PRESERVE_WEBPACK_CACHE: false, // (Umbrella Issue (https://gatsby.dev/cache-clearing-feedback)) · Use webpack's persistent caching and don't delete webpack's cache when changing gatsby-node.js & gatsby-config.js files.
    PRESERVE_FILE_DOWNLOAD_CACHE: false, // (Umbrella Issue (https://gatsby.dev/cache-clearing-feedback)) · Don't delete the downloaded files cache when changing gatsby-node.js & gatsby-config.js files.
    PARALLEL_SOURCING: false, // EXPERIMENTAL · (Umbrella Issue (https://gatsby.dev/parallel-sourcing-feedback)) · Run all source plugins at the same time instead of serially. For sites with multiple source plugins, this can speedup sourcing and transforming considerably.
    FUNCTIONS: false, // EXPERIMENTAL · (Umbrella Issue (https://gatsby.dev/functions-feedback)) · Compile Serverless functions in your Gatsby project and write them to disk, ready to deploy to Gatsby Cloud
  },
};
