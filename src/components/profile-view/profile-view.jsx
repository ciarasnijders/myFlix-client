import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Form, Button, Container, Row, Col, Card, ListGroup,  ListGroupItem } from 'react-bootstrap';


import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';

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

        console.log({ Username })

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
          })
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
            console.log(data);
            console.log(this.state.Username);
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
      console.log('logging out');
      window.location.href= '/';
      }

      render() {
        const { FavoriteMovies, validated, Username, Email, Birthday } = this.state;
        const { movies, onBackClick } = this.props;
    
        return (
          <Container className="mt-5 ProfileInfo">
          
          <h1>My Profile</h1>

          <br></br>

            <Row>
              <Col xs={12} sm={8} className="mb-5">
                <Card bg="black" border="light" text="white">
                  <Card.Body>
                    <Card.Title>Profile Info</Card.Title>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroupItem className="listitem" >Username: {Username} </ListGroupItem>
                    <ListGroupItem className="listitem">Password: *** </ListGroupItem>
                    <ListGroupItem className="listitem">Email: {Email} </ListGroupItem>
                    <ListGroupItem className="listitem">Birthday: {Birthday} </ListGroupItem>
                  </ListGroup>
                </Card>
              </Col>



              <Col xs={12} sm={8} className="mb-5">
                <Card bg="black" border="light" text="white">
                  <Card.Body>
                    <Card.Title>Update Your Information</Card.Title>
                        
                      <Form
                        noValidate
                        validated={validated}
                        className="update-form"
                        onSubmit={(e) =>
                          this.handleUpdate(
                            e,
                            this.state.Username,
                            this.state.Password,
                            this.state.Email,
                            this.state.Birthday
                          )
                        }
                      >
                      <Form.Group controlId="formUsername">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control
                          type="text"
                          onChange={(e) =>
                            this.setUsername(e.target.value)
                          }
                          placeholder="Username"
                        />
                      </Form.Group>

                      <Form.Group controlId="formPassword">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control
                          type="password"
                          onChange={(e) =>
                            this.setPassword(e.target.value)
                          }
                          minLength="8"
                          placeholder="Change your password"
                        />
                      </Form.Group>

                      <Form.Group controlId="formEmail">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control
                          type="email"
                          onChange={(e) =>
                            this.setEmail(e.target.value)
                          }
                          placeholder="Change your email"
                        />
                      </Form.Group>
                      <br></br>
                      <Button variant="light" type="submit">
                        Update
                      </Button>
                    </Form>

                    
                  </Card.Body>
                </Card>
              </Col>            
          </Row>
    
            {/* <Card bg="black" border="light" text="white" >
              <Row>
                <Col xs={12}>
                  <h4>Favorite Movies</h4>
                </Col>
              </Row>
    
              <div>

                    {FavoriteMovies && FavoriteMovies.length === 0 && (
                      <div className="text-center">
                        You have no favorite movies.
                      </div>
                    )}
                    <div className="favorites-movies " >
                      <Row md={3} className="g-4">
                      { FavoriteMovies && FavoriteMovies.length > 0 &&
                        movies.map((movie) => {
                          if (
                            movie._id ===
                            FavoriteMovies.find((fav) => fav === movie._id)
                          ) {
                            return (
                              <Col>
                                <Card
                                  className="favorites-item card-content"
                                  style={{ width: "16rem" }}
                                  key={movie._id}
                                >
                                  <Card.Img
                                    style={{ width: "18rem" }}
                                    className="movieCard"
                                    variant="top"
                                    src={movie.imageURL}
                                  />
                                  <Card.Body>
                                    <Card.Title className="movie-card-title">
                                      {movie.title}
                                    </Card.Title>
                                    <Button onClick={(e) => { this.removeAFavoriteMovie(e, movie) }} variant="danger" className="profile-button remove-favorite" value={movie._id}> Remove from List</Button>
                                  </Card.Body>
                                </Card>
                              </Col>
                            );
                          }
                        })}
                        </Row>
                    </div>
              </div>
            </Card> */}

            <Row>
                    <Button onClick={() => this.handleDeleteUser(user)} variant="light"> Delete Account</Button>
                  </Row>
                  <br></br>
                  <Row>
                    <Button onClick={() => this.onLoggedOut()} variant="light">Log out</Button>
                  </Row>
                  <br></br>
                  <Row>
                    <Button onClick={() => { onBackClick(); }} variant="light" className="button-back">Back to movies</Button>
            </Row>

          </Container>
        );
      }
    }