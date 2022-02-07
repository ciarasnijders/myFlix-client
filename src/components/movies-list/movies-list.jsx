import React from 'react';
import {Col, Row} from 'react-bootstrap';
import { connect } from 'react-redux';
// import './movies-list.scss'
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';

import { MovieCard } from '../movie-card/movie-card';

const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MoviesList(props) {
    const { movies, visibilityFilter } = props;
    let filteredMovies = movies;

    if (visibilityFilter !== '') {
        filteredMovies = movies.filter(m => m.title.toLowerCase().includes(visibilityFilter.toLowerCase()));
    }

    if (!movies) 
        return <div className="main-view"/>;

    return (
        <Row>
            <br></br>
            <Row className="mv-list-seachbar"> 
                <VisibilityFilterInput visibilityFilter={visibilityFilter}/>
            </Row>
            
            {filteredMovies.map(m => (
                <Col 
                    md={3} 
                    key={m._id} 
                    className="mt-5"
                >
                    <MovieCard movie={m} />
                </Col>
            ))
            }

        </Row>
    );
    
}

// const mapStateToProps = ({visibilityFilter, movies}, ownProps) =>({
//     visibilityFilter,
//     movies,
//     user: ownProps.user
// });

export default connect(mapStateToProps)(MoviesList);