import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './movie-card.scss';

import { Link } from "react-router-dom";

export class MovieCard extends React.Component {
  
    render() {
        console.log('this.props: ', this.props);
        
        const { movie } = this.props;
        
        return (
            <Card 
                className="movie-card" 
                bg="black" 
                text="white"
            >
                <Card.Img
                    className="card-img img-fluid" 
                    variant="top" 
                    src={movie.imageURL} 
                />
              
                <Card.Body>
                    <Card.Title as="h4">{movie.title}</Card.Title>
                    <Card.Text className="card-text">{movie.description.slice(0, 200)}...</Card.Text>
                    <Link to={`/movies/${movie._id}`}>
                        <Button 
                            className="mc-gotomovie-button" 
                            variant="link">
                                Go to movie
                        </Button>
                    </Link>
                </Card.Body>

            </Card>
        );
    }
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        year: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        director: PropTypes.shape({
            name: PropTypes.string.isRequired,
            bio: PropTypes.string.isRequired,
            birthYear: PropTypes.string.isRequired,
            deathYear: PropTypes.string.isRequired
        }).isRequired,
        featured:PropTypes.bool,
        imageURL: PropTypes.string.isRequired
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
};

export default MovieCard;