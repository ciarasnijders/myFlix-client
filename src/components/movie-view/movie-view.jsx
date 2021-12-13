import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

import {Container, Row, Col, Button, Card, CardGroup} from 'react-bootstrap'
import './movie-view.scss';


export class MovieView extends React.Component {

    addToFavorites(movie) {
        const username = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        console.log('username', username);
    
        axios.put(`https://whatflixapp.herokuapp.com/users/${username}/favorites/${movie.id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((response) => {
                console.log('response --->', response);
                this.componentDidMount();
            })
        .catch(function (error) {
            console.log(error);
        });
    }
    
    render() {
        const { movie, onBackClick } = this.props;

        return (      
            <div className="movie-view">
                {/* <div className="movie-poster">
                    <img src={movie.imageURL} />
                </div> */}
                <div className="movie-title">
                    <span className="label">Title: </span>
                    <span className="value">{movie.title}</span>
                </div>
                <div className="movie-description">
                    <span className="label">Description: </span>
                    <span className="value">{movie.description}</span>
                </div>
                <div className="movie-year">
                    <span className="label">Year: </span>
                    <span className="value">{movie.year}</span>
                </div>
                <div className="movie-genre">
                    <span className="label">Genre: </span>
                    <span className="value">{movie.genre}</span>
                </div>
                <div className="movie-director">
                    <span className="label">Director: </span>
                    <span className="value">{movie.director.name}</span>
                </div>

                <Link to={`/directors/${movie.director.name}`}>
                    <Button variant="link">Director</Button>
                </Link>

                <Link to={`/genres/${movie.genre}`}>
                    <Button variant="link">Genre</Button>
                </Link>
                <Button onClick={() => { this.addToFavorites(movie) }} variant="outline-primary">Add to Favorites</Button>
                <Button onClick={() => { onBackClick(); }} variant="outline-primary" className="button-back">Back</Button>

            </div>
        );
    }
}

MovieView.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        year: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        director: PropTypes.shape({
            name: PropTypes.string.isRequired,
            bio: PropTypes.string.isRequired,
            birthYear: PropTypes.string.isRequired,
            deathYear: PropTypes.string
        }).isRequired,
        featured:PropTypes.bool,
        imageURL: PropTypes.string.isRequired
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
};