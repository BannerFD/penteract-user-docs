/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require('path')
const versions = require('./versions.json')
const Promise = require('bluebird')

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators

  const postTemplate = path.resolve(`src/templates/postTemplate.js`)

  const howToPromise = graphql(`
    {
      allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/howto/" } }) {
        edges {
          node {
            frontmatter {
              path
              version
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      let versionNumber = versions.indexOf(node.frontmatter.version) + 1
      createPage({
        path: `v${versionNumber}/howto/${node.frontmatter.path}`,
        component: postTemplate,
        context: { slug: node.frontmatter.path } // additional data can be passed via context
      })
    })
  })

  const techPromise = graphql(`
    {
      allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/tech/" } }) {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: `tech/${node.frontmatter.path}`,
        component: postTemplate,
        context: { slug: node.frontmatter.path } // additional data can be passed via context
      })
    })
  })

  return Promise.join(howToPromise, techPromise)
}
