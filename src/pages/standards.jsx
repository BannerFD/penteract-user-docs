import React, { Component } from 'react'
import { chain } from 'lodash'

class Standards extends Component {

  render () {
    return (
      <div>
        <h1>Standards</h1>
        <p>
          These documents provide a guide to the baseline standards expected
          when writing code for Penteract. You are expected to use good
          judgement and best practices beyond these guidlines. If you have any
          problems or need any help with anything please communicate. If you
          would like to suggest changes to this document please contact us
        </p>
        <hr />
        { chain(this.props.data.standards.edges).map((standard, index) => {
          console.log(standard)
          return (
            <div key={index}>
              <h1>{standard.node.frontmatter.type}</h1>
              <div
                dangerouslySetInnerHTML={{
                  __html: standard.node.html
                }}
              />
              <hr />
            </div>

          )
        }).value()}
      </div>
    )
  }
}

export const pageQuery = graphql`
  query standards {
    standards: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/standards/" }
      }
    ) {
      edges {
        node {
          frontmatter {
            type
          }
          html
        }
      }
    }
  }
`

export default Standards
