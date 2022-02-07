import React from 'react';
import axios from 'axios';
import './director-view.scss'

import {Button} from 'react-bootstrap'

export class DirectorView extends React.Component {
    
    render() {
        const { director, onBackClick } = this.props;

        return (      
            <div className="director-view">
                <br></br>
                <div className="director-name">
                    <span className="label">Name: </span>
                    <span className="value">{director.name}</span>
                </div>
                <div className="director-bio">
                    <span className="label">Biography: </span>
                    <span className="value">{director.bio}</span>
                </div>
                <div className="director-birthyear">
                    <span className="label">Year of birth: </span>
                    <span className="value">{director.birthYear}</span>
                </div>
                <div className="director-deathyear">
                    <span className="label">Year of death: </span>
                    <span className="value">{director.deathYear}</span>
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