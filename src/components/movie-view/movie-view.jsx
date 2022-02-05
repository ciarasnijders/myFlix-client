import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

import {Button} from 'react-bootstrap'
import './movie-view.scss';


export class MovieView extends React.Component {

    addToFavorites(movie) {
        const username = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        console.log('username', username);
    
        axios.put
        (`https://whatflixapp.herokuapp.com/users/${username}/favorites/${movie._id}`,
        {},
        {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((response) => {
            alert("Movie was addded to Favorites");
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
                <div className="movie-poster">
                    <img src={movie.imageURL} className="movie-poster-image" />
                </div>
                <br></br>
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
                    <Link to={`/genres/${movie.genre}`}>
                        <Button variant="link" className="value">{movie.genre}</Button>
                    </Link>
                </div>
                <div className="movie-director">
                    <span className="label">Director: </span>
                    <Link to={`/directors/${movie.director.name}`}>
                        <Button variant="link" className="value">{movie.director.name}</Button>
                    </Link>
                </div>

                <br></br>

                <Link to={`/directors/${movie.director.name}`}>
                    <Button variant="link" className="movie-view-link">Director</Button>
                </Link>
                <Link to={`/genres/${movie.genre}`}>
                    <Button variant="link" className="movie-view-link">Genre</Button>
                </Link>

                <br></br>
                <br></br>

                <Button onClick={() => { this.addToFavorites(movie) }} variant="outline-secondary">Add to Favorites</Button>
                <Button onClick={() => { onBackClick(); }} variant="outline-secondary" size="md" style={{float:'right'}} className="button-back">Back</Button>

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