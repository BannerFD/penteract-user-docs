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
    <h1>Contact Us</h1>
    <form
      name="question"
      method="POST"
      action="/success/"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
    >
      <input type="hidden" name="bot-field" />
      <FormGroup>
        <ControlLabel>Your Name</ControlLabel>
        <FormControl
          name="name"
          type="text"
          placeholder="Name"
          required={true}
        />
      </FormGroup>
      <FormGroup>
        <ControlLabel>Email</ControlLabel>
        <FormControl
          name="email"
          type="email"
          placeholder="Email"
          required={true}
        />
      </FormGroup>
      <FormGroup>
        <ControlLabel>Query</ControlLabel>
        <FormControl
          name="question"
          type="text"
          placeholder="Question..."
          componentClass="textarea"
          rows={8}
          required={true}
        />
      </FormGroup>
      <Button type="submit" bsStyle="info">
        Submit
      </Button>
    </form>
  </div>
)

export default SecondPage
