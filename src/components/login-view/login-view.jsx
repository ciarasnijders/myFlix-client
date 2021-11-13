import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Form, Button, Card, Container, Col, Row} from 'react-bootstrap';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedInHandler(username) */
    props.onLoggedInHandler(username);
  };

  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>User Login</Card.Title>

               <Form className="login-form">

                <Form.Group className="mb-3" controlId="formUsername">
                  <Form.Label>Username:</Form.Label>
                  <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Password:</Form.Label>
                  <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </Form.Group>

                <Button variant="outline-secondary" type="submit" onClick={handleSubmit}> Submit </Button>

                {/* <a type="registration" onClick={props.handleRegistration}> Log in </a> */}
                
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>

  );
}