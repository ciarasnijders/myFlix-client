import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Form, Button, Card, Container, Col, Row} from 'react-bootstrap';
import axios from 'axios';

export function LoginView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
            console.log(username, password, "data!!!")
        /* Send a request to the server for authentication */
        axios.post('http://whatflixapp.herokuapp.com/login', {
            Username: username,
            Password: password
        })
        .then(response => {
            const data = response.data;
            props.onLoggedIn(data);
        })
        .catch(e => {
            console.log(e)
            console.log('no such user')
        });
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
                                <Form.Control 
                                    type="text" 
                                    onChange={e => setUsername(e.target.value)} 
                                />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formPassword">
                                <Form.Label>Password:</Form.Label>
                                <Form.Control 
                                    type="password" 
                                    value={password} 
                                    onChange={e => setPassword(e.target.value)} 
                                />
                                </Form.Group>

                                <Button 
                                    variant="outline-secondary" 
                                    type="submit" 
                                    onClick={handleSubmit}
                                >
                                    Submit 
                                </Button>

                                <Button 
                                    variant="link"  
                                    onClick={props.redirectToRegister}
                                > 
                                    Register 
                                </Button>
                        
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}