import React from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Card, ListGroup,  ListGroupItem } from 'react-bootstrap';

import './profile-view.scss'

export class ProfileView extends React.Component{

    constructor() {
        super();

        this.state = {
            Username: null,
            Password: null,
            Email: null,
            Birthday: null,
            FavoriteMovies: [],
        };
        
    }

    componentDidMount() {
        const accessToken = localStorage.getItem('token');
        this.getUser(accessToken);
    }

    getUser(token) {
        axios.get(
            `https://whatflixapp.herokuapp.com/users/${localStorage.getItem('user')}`, 
            {
            headers: { Authorization: `Bearer ${token}`}
            })
            .then(response => {
                console.log(response)
                // Assign the result to the state
                this.setState({
                    Username: response.data.Username,
                    Password: response.data.Password,
                    Email: response.data.Email,
                    Birthday: response.data.Birthday,
                    FavoriteMovies: response.data.Favorites,
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    handleUpdate( e, Username, Password, Email, Birthday) {
        e.preventDefault();

        const username = localStorage.getItem('user');
        const token = localStorage.getItem("token");
        axios.put(
            `https://whatflixapp.herokuapp.com/users/${localStorage.getItem('user')}`, 
            {
                Username: this.state.Username,
                Password: this.state.Password,
                Email: this.state.Email,
                Birthday: this.state.Birthday
            }, 
            {
                headers: { Authorization: `Bearer ${token}`},
            }
        )
        .then((response) => {
            alert("Saved Changes");
            this.setState({
                Username: response.data.Username,
                Password: response.data.Password,
                Email: response.data.Email,
                Birthday: response.data.Birthday,
            });
            localStorage.setItem("user", response.data.Username);
            
            const data = response.data;
            window.location.reload();
            // window.open(`/users/${Username}`, "_self");
        })
        
        .catch(function (error) {
            console.log(error);
        });
    }
    
    setUsername(input) {
        console.log({ input })
        this.state.Username = input;
    }
    
    setPassword(input) {
        this.state.Password = input;
    }
    
    setEmail(input) {
        this.state.Email = input;
    }
    
    setBirthdate(input) {
        this.state.Birthday = input;
    }
  
    handleDeleteUser(e) {
        e.preventDefault();
    
        const token = localStorage.getItem("token");
        const Username = localStorage.getItem("user");

        axios
            .delete(`https://whatflixapp.herokuapp.com/users/${Username}`,
            {
                headers: { Authorization: `Bearer ${token}` },
            })

            .then(() => {
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                alert("Your account has been deleted.");
                window.open(`/`, "_self");
            })

            .catch(function (error) {
                console.log(error);
            });
    }

    removeAFavoriteMovie = (e, movie) => {
        const token = localStorage.getItem("token");
        const Username = localStorage.getItem("user");
    
        axios.delete
        (`https://whatflixapp.herokuapp.com/users/${Username}/favorites/${movie._id}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
        )
          
        .then((response) => {
            alert("Movie was removed");
                console.log(response);
            this.componentDidMount();
        })

        .catch(function (error) {
            console.log(error);
        });
    }


    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            user: null
        });

        window.location.href= '/';
    }

    render() {
        const { FavoriteMovies, validated, Username, Email, Birthday } = this.state;
        const { movies, onBackClick } = this.props;
    
        return (
            <Container className="ProfileInfo">
          
                <h1 style={{color:"#F8F9FA"}}>My Profile</h1>

                <br></br>

                <Row className="justify-content-md-center">
                    <Col 
                        className="mb-5"
                        xs={12} 
                        sm={8}
                    >
                        <Card 
                            bg="black" 
                            border="light" 
                            text="white"
                        >
                            <Card.Body>
                                <Card.Title>Profile Info</Card.Title>
                            </Card.Body>
                            <ListGroup className="list-group-flush" variant="dark">
                                <ListGroupItem className="listitem" >Username: {Username} </ListGroupItem>
                                <ListGroupItem className="listitem">Password: *** </ListGroupItem>
                                <ListGroupItem className="listitem">Email: {Email} </ListGroupItem>
                                <ListGroupItem className="listitem">Birthday: {Birthday} </ListGroupItem>
                            </ListGroup>
                        </Card>
                    </Col>



                    <Col 
                        className="mb-5"
                        xs={12} 
                        sm={8} 
                    >
                        <Card 
                            bg="black" 
                            border="light" 
                            text="white"
                        >
                            <Card.Body>
                                <Card.Title>Update Your Information</Card.Title>
                                
                                <Form
                                    noValidate
                                    validated={validated}
                                    className="update-form"
                                    onSubmit={(e) => this.handleUpdate(
                                        e,
                                        this.state.Username,
                                        this.state.Password,
                                        this.state.Email,
                                        this.state.Birthday
                                    )}
                                >

                                    <Form.Group controlId="formUsername">
                                        <Form.Label>Username:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            onChange={(e) => this.setUsername(e.target.value)}
                                            placeholder="Username"
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formPassword">
                                        <Form.Label>Password:</Form.Label>
                                        <Form.Control
                                            type="password"
                                            onChange={(e) => this.setPassword(e.target.value)}
                                            minLength="8"
                                            placeholder="Change your password"
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formEmail">
                                        <Form.Label>Email:</Form.Label>
                                        <Form.Control
                                            type="email"
                                            onChange={(e) =>this.setEmail(e.target.value)}
                                            placeholder="Change your email"
                                        />
                                    </Form.Group>

                                    <br></br>

                                    <Button 
                                        variant="light" 
                                        type="submit"
                                    >
                                        Update
                                    </Button>
                                </Form>

                            
                            </Card.Body>
                        </Card>
                    </Col>            
                </Row>


                <Row className="pv-button-row">
                    <div className="pv-button-container">
                        <Button 
                            onClick={() => this.handleDeleteUser(user)} 
                            variant="light" 
                            className="profile-view-buttons"
                        > 
                            Delete Account
                        </Button>
                        <Button 
                            onClick={() => this.onLoggedOut()} 
                            variant="light" 
                            className="profile-view-buttons"
                        >
                            Log out
                        </Button>
                        <Button 
                            onClick={() => { onBackClick(); }} 
                            variant="light" 
                            className="button-back profile-view-buttons"
                        >
                            Back to movies
                        </Button>
                    </div>
                </Row>

            </Container>
        );
    }
}