import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


export class MovieCard extends React.Component {
    render() {
        console.log('this.props: ', this.props);
        
        const { movie, onMovieClick } = this.props;
        
        return (
            <Card>
              <Card.Img variant="top" src={movie.ImagePath} />
              <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text>{movie.Description}</Card.Text>
                <Button onClick={() => onMovieClick(movie)} variant="link">Open</Button>
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
    onMovieClick: PropTypes.func.isRequired
};