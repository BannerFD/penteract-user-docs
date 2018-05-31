import React, { Component } from 'react'
import Link from 'gatsby-link'
import { Panel, Label, Row, Col, Accordion, Collapse } from 'react-bootstrap'
import { map } from 'lodash'

class V3 extends Component {
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
    let faqs = this.props.data.faq.edges
    let howto = this.props.data.howto.edges
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

        <h2>How To Articles</h2>

        <Row>
          {map(howto, (edge, index) => {
            return (
              <Col key={index} md={3}>
                <Link
                  to={`${this.props.location.pathname}howto/${
                    edge.node.frontmatter.path
                  }`}
                  style={{
                    textDecoration: 'none',
                    color: 'black',
                    fontSize: '20px',
                  }}
                >
                  <Panel>
                    <Panel.Heading>{edge.node.frontmatter.name}</Panel.Heading>
                    <Panel.Body>
                      <p>{edge.node.frontmatter.description}</p>
                    </Panel.Body>
                    <Panel.Footer>
                      {map(edge.node.frontmatter.tags, (tag, i) => {
                        return (
                          <Label
                            key={i}
                            bsStyle="info"
                            style={{ marginRight: '5px', fontSize: '12px' }}
                          >
                            {tag}
                          </Label>
                        )
                      })}
                    </Panel.Footer>
                  </Panel>
                </Link>
              </Col>
            )
          })}
        </Row>

        <h2>FAQ</h2>

        {map(faqs, (edge, index) => {
          return (
            <Panel key={index} style={{ fontSize: '20px' }}>
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
  query v3Faq {
    faq: allMarkdownRemark(
      filter: { frontmatter: { version: { eq: 3 }, faq: { eq: true } } }
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

    howto: allMarkdownRemark(
      filter: { frontmatter: { version: { eq: 3 }, howto: { eq: true } } }
    ) {
      edges {
        node {
          frontmatter {
            path
            tags
            name
            description
          }
        }
      }
    }
  }
`

export default V3
