import React from 'react';
import axios from 'axios';
import { CardGroup } from 'react-bootstrap';

import { Link } from "react-router-dom";

import {Container, Row, Col, Button, Card, CardGroup} from 'react-bootstrap'


export class MovieView extends React.Component {
    
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

                <button onClick={() => onBackClick(null)}>Back</button>

            </div>
        );
    }
}