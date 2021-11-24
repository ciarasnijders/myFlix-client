import React from 'react';
import axios from 'axios';

import { Link } from "react-router-dom";

import {Container, Row, Col, Button, Card, CardGroup} from 'react-bootstrap'


export class GenreView extends React.Component {
    
    render() {
        const { genre, onBackClick } = this.props;

        return (      
            <div className="genre-view">
                <div className="genre-name">
                    <span className="label">Genre: </span>
                    <span className="value">{genre.name}</span>
                </div>
                <div className="genre-description">
                    <span className="label">Description: </span>
                    <span className="value">{genre.Description}</span>
                </div>
                <button onClick={() => onBackClick(null)}>Back</button>

            </div>
        );
    }
}