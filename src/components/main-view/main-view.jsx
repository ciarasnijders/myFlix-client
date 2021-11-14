import React from 'react';
import axios from 'axios';
import {LoginView} from '../login-view/login-view';
import {RegistrationView} from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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

    componentDidMount(){
        axios.get('https://whatflixapp.herokuapp.com/movies')
          .then(response => {
            this.setState({
              movies: response.data
            });
          })
          .catch(error => {
            console.log(error);
          });
      }
    
    /*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie*/
    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
      }
    
    onLoggedIn(user) {
        this.setState({
            user
        });
    }

    handleRegistration(e) {
        e.preventDefault()
        console.log(e)
        this.setState({
            newUser: true
        });
    }


    render() {
        const { movies, selectedMovie, user, newUser } = this.state;

        /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
        if (!user) {
            return (
                <div className="authentication-flow">
                    {newUser
                        ? <RegistrationView onLoggedInHandler={user => this.onLoggedIn(user)} />
                        : <LoginView onLoggedInHandler={user => this.onLoggedIn(user)} handleRegistration={this.handleRegistration}/>
                    }
                </div>
            );
        }

        if (movies.length === 0) return <div className="main-view" />;
        
        return (
            <Row className="main-view justify-content-md-center">
                {/*If the state of `selectedMovie` is not null, that selected movie will be returned otherwise, all *movies will be returned*/}
                {selectedMovie
                    ? (
                        <Col md={8}>
                            <MovieView movie={selectedMovie} onBackClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie); }}/>
                        </Col>
                        
                    )
                    : movies.map(movie => (
                        <Col md={3} key={movie.id}>
                            <MovieCard 
                                movie={movie} 
                                onMovieClick={(movie) => { this.setSelectedMovie(movie); }}/>
                        </Col>
                    ))
                }
            </Row>
        );
      }
}