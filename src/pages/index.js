import React from 'react'
import Link from 'gatsby-link'
import { Panel, Label, Row, Col } from 'react-bootstrap'

const IndexPage = () => (
  <div>
    <h1>Penteract Help</h1>
    <p style={{ fontSize: '20px' }}>
      The aim of this documentation is to provide a better experience for you
      when using the Penteract system. If you are unsure of how to do something
      this is a great spot to start. If you cannot find answers to your
      questions here feel free to <Link to="/contact/">submit a question</Link>{' '}
      and we'll get back to you as quickly as possible.
    </p>

    <h2>Versions</h2>
    <Panel>
      <Panel.Body>
        <h3>
          <Link to="/v3/">Lithium</Link>
          <Label bsStyle="success" style={{ marginLeft: '10px' }}>
            live
          </Label>
        </h3>
      </Panel.Body>
    </Panel>
    <Panel>
      <Panel.Body>
        <h3>
          <Link to="/v4/">Beryllium</Link>
          <Label bsStyle="info" style={{ marginLeft: '10px' }}>
            dev
          </Label>
        </h3>
      </Panel.Body>
    </Panel>
  </div>
)

export default IndexPage
