import React from 'react';
import axios from 'axios';
import './genre-view.scss'

import { Button } from 'react-bootstrap'


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
                <br></br>
                <Button 
                    variant="outline-secondary"
                    onClick={() => onBackClick(null)}
                >
                    Back
                </Button>

            </div>
        );
    }
}