import React, { Component } from 'react'
import Link from 'gatsby-link'
import { Panel, Label, Row, Col, Accordion, Collapse } from 'react-bootstrap'
import { map } from 'lodash'

class V4 extends Component {
  state = {
    open: [],
  }

  mkopen = index => {
    let open = [...this.state.open]
    open[index] = !open[index]

    this.setState({
      open: open,
    })
  }

  render() {
    let edges = this.props.data.allMarkdownRemark.edges
    return (
      <div>
        <h1>Penteract Help</h1>
        <p style={{ fontSize: '20px' }}>
          The aim of this documentation is to provide a better experience for
          you when using the Penteract system. If you are unsure of how to do
          something this is a great spot to start. If you cannot find answers to
          your questions here feel free to{' '}
          <Link to="/contact/">submit a question</Link> and we'll get back to
          you as quickly as possible.
        </p>

        <h2>FAQ</h2>

        {map(edges, (edge, index) => {
          return (
            <Panel key={index}>
              <Panel.Heading onClick={() => this.mkopen(index)}>
                {edge.node.frontmatter.question}
              </Panel.Heading>
              <Collapse in={this.state.open[index]}>
                <Panel.Body>
                  <div
                    className="blog-post-content"
                    dangerouslySetInnerHTML={{ __html: edge.node.html }}
                  />
                </Panel.Body>
              </Collapse>
            </Panel>
          )
        })}

        <p style={{ fontSize: '20px' }}>
          Can't find what you're looking for? Submit a{' '}
          <Link to="/feature/">feature request</Link> or{' '}
          <Link to="/contact/">question.</Link>
        </p>
      </div>
    )
  }
}

export const pageQuery = graphql`
  query v4Faq {
    allMarkdownRemark(
      filter: { frontmatter: { version: { eq: 4 }, faq: { eq: true } } }
    ) {
      edges {
        node {
          frontmatter {
            question
          }
          html
        }
      }
    }
  }
`

export default V4
