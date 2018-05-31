module.exports = {
  siteMetadata: {
    title: 'Penteract Docs',
  },
  plugins: [
    `gatsby-plugin-netlify-cms`,
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/docs`,
        name: 'markdown-pages',
      },
    },
    `gatsby-transformer-remark`,
  ],
}
