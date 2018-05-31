import React from 'react'
import Link from 'gatsby-link'
import {
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  Button,
} from 'react-bootstrap'

const SecondPage = () => (
  <div>
    <h1>Request a Feature</h1>
    <form name="feature" method="POST" netlify>
      <FormGroup>
        <ControlLabel>Your Name (optional)</ControlLabel>
        <FormControl name="name" type="text" placeholder="Name" />
      </FormGroup>
      <FormGroup>
        <ControlLabel>Email (optional)</ControlLabel>
        <FormControl name="email" type="email" placeholder="Email" />
      </FormGroup>
      <FormGroup>
        <ControlLabel>Feature</ControlLabel>
        <FormControl
          name="feature"
          type="text"
          placeholder="Requested Feature"
          componentClass="textarea"
          rows={8}
          required={true}
        />
      </FormGroup>
      <Button bsStyle="info">Submit</Button>
    </form>
  </div>
)

export default SecondPage
