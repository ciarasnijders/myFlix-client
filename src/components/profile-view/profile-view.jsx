import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Form, Button, Container, Row, Col, Card, ListGroup, CardGroup,  ListGroupItem } from 'react-bootstrap';


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
            Favorites: []
        };
    }

    componentDidMount() {
        const accessToken = localStorage.getItem('token');
        this.getUser(accessToken);
    }

    getUser(token) {
        axios.get('https://whatflixapp.herokuapp.com/users', {
            headers: { Authorization: `Bearer ${token}`}
        })
        .then(response => {
            // Assign the result to the state
            this.setState({
                Username: response.data.Username,
                Password: response.data.Password,
                Email: response.data.Email,
                Birthday: response.data.Birthday,
                FavoriteMovies: response.data.FavoriteMovies,
            });
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    handleUpdate( e, Username, Password, Email, Birthday) {
        this.setState({
          validated: null,
        });
    
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
          e.preventDefault();
          e.stopPropagation();
          this.setState({
            validated: true,
          });
          return;
        }
        e.preventDefault();
    
        const token = localStorage.getItem("token");
        console.log(token);
        axios.put(`https://whatflixapp.herokuapp.com/users${Username}`, {
            headers: {Authorization: `Bearer ${token}`},
            data: {
              Username: this.state.Username,
              Password: this.state.Password,
              Email: this.state.Email,
              Birthday: this.state.Birthday,
            },
          })
          .then((response) => {
            alert("Saved Changes");
            this.setState({
              Username: response.data.Username,
              Password: response.data.Password,
              Email: response.data.Email,
              Birthday: response.data.Birthday,
            });
            localStorage.setItem("user", this.state.Username);
            window.open(`/users/${Username}`, "_self");
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    
      setUsername(input) {
        this.Username = input;
      }
    
      setPassword(input) {
        this.Password = input;
      }
    
      setEmail(input) {
        this.Email = input;
      }
    
      setBirthdate(input) {
        this.Birthday = input;
      }
  
    handleDeleteUser(e) {
        e.preventDefault();
    
        const token = localStorage.getItem("token");
        const Username = localStorage.getItem("user");
    
        axios
          .delete(`https://whatflixapp.herokuapp.com/users${Username}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then(() => {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            alert("Your account has been deleted.");
            window.open(`/`, "_self");
          })
          .catch((e) => {
            console.log(e);
          });
    }

    removeAFavoriteMovie() {
        const token = localStorage.getItem("token");
        const Username = localStorage.getItem("user");
    
        axios
          .delete(
            `https://obscure-castle-33842.herokuapp.com/users/${Username}/movies/${movie._id}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )
          .then(() => {
            alert("Movie was removed");
            this.componentDidMount();
          })
          .catch(function (error) {
            console.log(error);
          });
    }


    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        console.log('logging out');
        this.setState({
          user: null
        });
      }

      render() {
        const { FavoriteMovies, validated, Username, Email, Birthday } = this.state;
        const { movies } = this.props;
    
        return (
          <Container className="mt-5">
            <Row>
              <Col xs={12} sm={4} className="mb-5">
                <Card>
                  <Card.Body>
                    <Card.Title>Profile Info</Card.Title>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroupItem className="listitem">Username: {Username} </ListGroupItem>
                    <ListGroupItem className="listitem">Password: *** </ListGroupItem>
                    <ListGroupItem className="listitem">Email: {Email} </ListGroupItem>
                    <ListGroupItem className="listitem">Birthday: {Birthday} </ListGroupItem>
                  </ListGroup>
                </Card>
              </Col>
    
              <Col xs={12} sm={8} className="mb-5">
                <Card>
                  <Card.Body>
                    <Container>
                      <Row className="justify-content-md-center">
                        <Col md={8}>
                          <CardGroup>
                            <Card>
                              <Card.Body>
                                <Card.Title>Update</Card.Title>
    
                                <Form
                                  noValidate
                                  validated={validated}
                                  className="update-form"
                                  onSubmit={(e) =>
                                    this.handleUpdate(
                                      e,
                                      this.Username,
                                      this.Password,
                                      this.Email,
                                      this.Birthday
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
                                  <Button variant="primary" type="submit">
                                    Update
                                  </Button>
                                </Form>
                              </Card.Body>
                            </Card>
                          </CardGroup>
                        </Col>
                      </Row>
                    </Container>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
    
            <Card>
              <Row>
                <Col xs={12}>
                  <h4>Favorite Movies</h4>
                </Col>
              </Row>
    
              <Row>
                <Col>
                  <Card.Body>
                    {FavoriteMovies.length === 0 && (
                      <div className="text-center">
                        You have no favorite movies.
                      </div>
                    )}
                    <Row className="favorites-movies ">
                      {FavoriteMovies.length > 0 &&
                        movies.map((movie) => {
                          if (
                            movie._id ===
                            FavoriteMovies.find((fav) => fav === movie._id)
                          ) {
                            return (
                                <Card
                                  className="favorites-item card-content"
                                  style={{ width: "16rem" }}
                                  key={movie._id}
                                >
                                  <Card.Img
                                    style={{ width: "18rem" }}
                                    className="movieCard"
                                    variant="top"
                                    src={movie.ImageURL}
                                  />
                                  <Card.Body>
                                    <Card.Title className="movie-card-title">
                                      {movie.Title}
                                    </Card.Title>
                                    <Button
                                      size="sm"
                                      className="profile-button remove-favorite"
                                      variant="danger"
                                      value={movie._id}
                                      onClick={(e) =>
                                        this.removeAFavoriteMovie(e, movie)
                                      }
                                    >
                                      Remove
                                    </Button>
                                  </Card.Body>
                                </Card>
                            );
                          }
                        })}
                    </Row>
                  </Card.Body>
    
                  <Button
                    variant="secondary"
                    onClick={() => handleDeleteUser(e, user)}
                  >
                    Delete Account
                  </Button>
                </Col>
              </Row>
            </Card>
          </Container>
        );
      }
    }