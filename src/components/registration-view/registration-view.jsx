import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {Form, Button, Card, CardGroup, Container, Col, Row} from 'react-bootstrap';

import'./registration-view.scss';
import axios from 'axios';

export function RegistrationView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedInHandler(username) */
    props.onLoggedInHandler(username);
  };

  return (
    <Container>
      <Row>
        <Col>
          <CardGroup>
            <Card>
              <Card.Body>
              <Card.Title>User Registration</Card.Title>
                <Form className="registration-form"> 

                  <Form.Group className="mb-3">
                    <Form.Label> Username: </Form.Label>
                    <Form.Control 
                      type="text" 
                      placeholder="Enter a username"
                      value={username} 
                      onChange={e => setUsername(e.target.value)} 
                      required 
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label> Password: </Form.Label>
                    <Form.Control
                      type="password" 
                      minLength = "8"
                      placeholder="Enter a password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                      aria-describedby="passwordHelpBlock" 
                    />
                    <Form.Text id="passwordHelpBlock" muted> Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji. </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label> Email: </Form.Label>
                    <Form.Control
                      type="text" 
                      placeholder="Enter your email address"
                      value={email} 
                      onChange={e => setEmail(e.target.value)}
                      required 
                    />
                  </Form.Group>

                  <Button 
                    variant="primary"
                    type="submit" 
                    onClick={handleSubmit} >
                      Submit
                  </Button>

                </Form>
              </Card.Body>
            </Card>
          </CardGroup>

        </Col>
      </Row>
    </Container>
    
    
  );
}