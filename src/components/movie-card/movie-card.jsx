import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from "react-router-dom";

export class MovieCard extends React.Component {
  
  render() {
    console.log('this.props: ', this.props);
        
    const { movie } = this.props;
        
        return (
            <Card bg="black" border="light border-3" text="white">
              <Card.Img variant="top" src={movie.ImageURL} />
              <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{movie.description}</Card.Text>
                <Link to={`/movies/${movie._id}`}>
                  <Button variant="link">See movie</Button>
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