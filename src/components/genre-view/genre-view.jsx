import React from 'react';
import axios from 'axios';

import { Link } from "react-router-dom";

import {Container, Row, Col, Button, Card, CardGroup} from 'react-bootstrap'


export class GenreView extends React.Component {

    constructor(){
        super();
        this.state = {
            genres: {}
        }
    }

    componentDidMount() {
        axios.get( `https://whatflixapp.herokuapp.com/genres/${this.props.genres}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        .then(response => {
            this.setState({
                genres: response.data
            });
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    
    render() {
        const { onBackClick } = this.props;
        const { genres } = this.state


        return (      
            <div className="genre-view">
                <div className="genre-name">
                    <span className="label">Genre: </span>
                    <span className="value">{genres.Name}</span>
                </div>
                <div className="genre-description">
                    <span className="label">Description: </span>
                    <span className="value">{genres.Description}</span>
                </div>
                <button onClick={() => onBackClick(null)}>Back</button>

            </div>
        );
    }
}