import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route, Redirect, Link } from "react-router-dom";

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';


export default class MainView extends React.Component {

    constructor(){
        super();
        this.state = {
            movies: [],
            selectedMovie: null,
            user: null,
            newUser: false
        }
        this.handleRegistration=this.handleRegistration.bind(this);
    }
    
    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
          this.setState({
            user: localStorage.getItem('user')
          });
          this.getMovies(accessToken);
        }
    }

    getMovies(token) {
        axios.get('https://whatflixapp.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}`}
        })
        .then(response => {
            // Assign the result to the state
            this.setState({
                movies: response.data
            });
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    /*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie*/
    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
      }
    
    onLoggedIn(authData) {
        console.log('auth data ---->', authData);
        this.setState({
            user: authData.user.Username
        });
      
        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    }

    handleRegistration(e) {
        e.preventDefault()
        console.log(e)
        this.setState({
            newUser: true
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
        const { movies, user, newUser } = this.state;
        console.log(user, 'user!!')
        return (
            <Router>
                <Row className="main-view justify-content-md-center">

                    <Route exact path="/" render={() => {
                        console.log('root')
                        if (!user) { 
                            return (
                                <Col>
                                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                                </Col>
                            )
                        }
                        if (movies.length === 0) return <div className="main-view" />;
                        console.log('movies --->', movies)
                        return movies.map(movie => (
                            <Col md={3} key={movie._id}>
                                <MovieCard movie={movie} />
                            </Col>
                        ))
                    }} />

                    <Route path="/register" render={() => {
                        if (user) 
                            return <Redirect to="/" />
                        return (
                            <Col> 
                                <RegistrationView />
                            </Col>
                        )
                    }} />

                    <Route exact path="/movies/:movieId" render={({ match, history }) => {
                        if (!user) return 
                            <Col>
                                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                            </Col>
                        if (movies.length === 0) return <div className="main-view" />;
                        return <Col md={8}>
                            <MovieView movie={movies.find(movie => movie._id === match.params.movieId)} onBackClick={() => history.goBack()} />
                            </Col>
                    }} />

                    <Route exact path="/genres/:name" render={({ match, history }) => {
                        if (!user) return 
                        <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>
                        if (movies.length === 0) return <div className="main-view" />;
                        return <Col md={8}>
                            <GenreView genres={ match.params.name } onBackClick={() => history.goBack()}/>
                        </Col>
                    }} />

                    <Route path="/directors/:name" render={({ match, history }) => {
                        console.log('director route')
                        if (!user) return 
                        <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>
                        if (movies.length === 0) return <div className="main-view" />;
                        return <Col md={8}>
                            <DirectorView director={movies.find(movie => movie.director.name === match.params.name).director} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />

                    <Link to={`/users/${user}`} >{user}</Link>
                    <Route path='/users/:username' render={({history, match}) => {
                        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        if (movies.length === 0) return <div className="main-view" />;
                        return <ProfileView history={history} movies={movies} user={user === match.params.username} onBackClick={() => window.location.href= '/'}/>
                        }} 
                    />

                </Row>
            </Router>

        );
      }
}