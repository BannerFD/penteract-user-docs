import React from 'react'
import {
  FormGroup,
  ControlLabel,
  FormControl,
  Button
} from 'react-bootstrap'

const SecondPage = () => (
  <div>
    <h1>Contact Us</h1>
    <form
      name='question'
      method='POST'
      action='/success/'
      data-netlify='true'
      data-netlify-honeypot='bot-field'
    >
      <input type='hidden' name='bot-field' />
      <FormGroup>
        <ControlLabel>Your Name</ControlLabel>
        <FormControl
          name='name'
          type='text'
          placeholder='Name'
          required
        />
      </FormGroup>
      <FormGroup>
        <ControlLabel>Email</ControlLabel>
        <FormControl
          name='email'
          type='email'
          placeholder='Email'
          required
        />
      </FormGroup>
      <FormGroup>
        <ControlLabel>Query</ControlLabel>
        <FormControl
          name='question'
          type='text'
          placeholder='Question...'
          componentClass='textarea'
          rows={8}
          required
        />
      </FormGroup>
      <Button type='submit' bsStyle='info'>
        Submit
      </Button>
    </form>
  </div>
)

export default SecondPage
