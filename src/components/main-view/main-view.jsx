import React from 'react';
import axios from 'axios';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
// import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import { setMovies } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';
import NavBar from '../navbar/navbar';
import FavoritesView from '../favorites-view/favorites-view';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Redirect, Link } from "react-router-dom";
import { Container, Row, Col, Button } from 'react-bootstrap';


class MainView extends React.Component {

    constructor(){
        super();
        this.state = {
            user: null,
            newUser: false
        }
        this.handleRegistration=this.handleRegistration.bind(this);
        this.redirectToLogin=this.redirectToLogin.bind(this);
        this.redirectToRegister=this.redirectToRegister.bind(this);

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
            this.props.setMovies(response.data);
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

    redirectToLogin() {
        window.location.href= '/'
    }

    redirectToRegister() {
        window.location.href= '/register'
    }

    handleRegistration() {
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
        let { movies } = this.props;
        let { user } = this.state;

        return (

            <Router>
                <NavBar />
                <Row className="main-view justify-content-md-center">

                    <Route exact path="/" render={() => {
                        console.log('root')
                        if (!user) { 
                            return (
                                <Col>
                                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} redirectToRegister={() => this.redirectToRegister()}/>
                                </Col>
                            )
                        }
                        if (movies.length === 0) return <div className="main-view" />;
                        console.log('movies --->', movies)
                        return <MoviesList movies={movies}/>;
                    }} />

                    <Route path="/register" render={() => {
                        if (user) 
                            return <Redirect to="/" />
                        return (
                            <Col> 
                                <RegistrationView redirectToLogin={() => this.redirectToLogin()}/>
                            </Col>
                        )
                    }} />

                    <Route exact path="/movies/:movieId" render={({ match, history }) => {
                        if (!user) return 
                            <Col>
                                <LoginView onLoggedIn={user => this.onLoggedIn(user)} redirectToRegister={() => this.redirectToRegister()} />
                            </Col>
                        if (movies.length === 0) return <div className="main-view" />;
                        return <Col md={8}>
                            <MovieView movie={movies.find(movie => movie._id === match.params.movieId)} onBackClick={() => history.goBack()} />
                            </Col>
                    }} />

                    <Route exact path="/genres/:name" render={({ match, history }) => {
                        if (!user) return 
                        <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} redirectToRegister={() => this.redirectToRegister()} />
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
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} redirectToRegister={() => this.redirectToRegister()} />
                        </Col>
                        if (movies.length === 0) return <div className="main-view" />;
                        return <Col md={8}>
                            <DirectorView director={movies.find(movie => movie.director.name === match.params.name).director} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />


                    <Link to={`/users/${user}`} >{user}</Link>
                    <Route path='/users/:username' render={({history, match}) => {
                        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} redirectToRegister={() => this.redirectToRegister()} />
                        if (movies.length === 0) return <div className="main-view" />;
                        return <ProfileView history={history} movies={movies} user={user === match.params.username} onBackClick={() => window.location.href= '/'}/>
                    }} 
                    />

                    <Link to={`/favorites`}>{user}</Link>
                    <Route path="/favorites" render={({ match, history }) => {
                        console.log('favorites route')
                        if (!user) return 
                        <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} redirectToRegister={() => this.redirectToRegister()} />
                        </Col>
                        if (movies.length === 0) return <div className="main-view" />;
                        return <Col md={8}>
                            <FavoritesView movies={movies} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />
                </Row>
            </Router>

        );
      }
};

let mapStateToProps = state => {
    return { movies: state.movies }
}
  

export default connect(mapStateToProps, { setMovies } )(MainView);