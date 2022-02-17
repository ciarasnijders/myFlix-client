import React, { useState } from 'react';
import axios from 'axios';
import'./registration-view.scss';
import {Form, Button, Card, CardGroup, Container, Col, Row} from 'react-bootstrap';


export function RegistrationView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ birthday, setBirthday] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password, email, birthday);
        /* Send a request to the server for authentication */

        axios.post('http://whatflixapp.herokuapp.com/users', {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        })

        .then(response => {
            const data = response.data;
            console.log(data);
            window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
        })

        .catch(e => {
            console.log('error registering the user')
        });
    }

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
                                        <Form.Text id="passwordHelpBlock" muted>
                                            Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji. 
                                        </Form.Text>
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

                                    <Form.Group className="mb-3">
                                        <Form.Label> Date of Birth: </Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            placeholder="Enter your date of birth"
                                            value={birthday} 
                                            onChange={e => setBirthday(e.target.value)} 
                                            required 
                                        />
                                    </Form.Group>

                                    <Button 
                                        variant="outline-secondary"
                                        type="submit" 
                                        onClick={handleSubmit} >
                                        Submit
                                    </Button>

                                    <Button 
                                        variant="link"  
                                        onClick={props.redirectToLogin}> 
                                        Login
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