import React from 'react';
import {Card, Row, Col, Button, Container} from 'react-bootstrap';
import { Link } from "react-router-dom";
import './favorites-view.scss'
import axios from 'axios';

class FavoritesView extends React.Component {
    constructor() {
        super()
        this.state = {
            FavoriteMovies: [],
        };
    }

    componentDidMount() {
        const accessToken = localStorage.getItem('token');
        this.getFavoriteMovies(accessToken);
    }

    getFavoriteMovies(token) {
        axios.get(
          `https://whatflixapp.herokuapp.com/users/${localStorage.getItem('user')}`, 
          {
            headers: { Authorization: `Bearer ${token}`}
          })
          .then(response => {
              this.setState({
                  FavoriteMovies: response.data.Favorites,
              });
          })
          .catch(function (error) {
              console.log(error);
          });
    }

    removeAFavoriteMovie = (e, movie) => {
        const token = localStorage.getItem("token");
        const Username = localStorage.getItem("user");
    
        axios.delete
        (`https://whatflixapp.herokuapp.com/users/${Username}/favorites/${movie._id}`,
            {
            headers: { Authorization: `Bearer ${token}`},
            }
        )
            .then((response) => {
                alert("Movie was removed");
                console.log(response);
            this.componentDidMount();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        const { FavoriteMovies } = this.state;
        const { movies, onBackClick } = this.props;


        return (
            <Container className="ListOfFavs justify-content-md-center">

                <h1 style={{color:"#F8F9FA"}}>My Favorite Movies</h1>
                <br></br>
    
                <div>
                    {FavoriteMovies && FavoriteMovies.length === 0 && (
                        <div className="text-center">
                            You have no favorite movies.
                        </div>
                    )}

                    <div className="favorites-movies" >
                        <Row md={4}>
                        { FavoriteMovies && FavoriteMovies.length > 0 &&
                        movies.map((movie, idx) => {
                            if (
                                movie._id ===
                                FavoriteMovies.find((fav) => fav === movie._id)
                            ) {
                            return (
                                <Row md={4} className="fv-moviecards">
                                    <Card 
                                        className="favorites-item card-content"
                                        bg="black" 
                                        text="white"
                                        style={{ width: "16rem" }}
                                        key={movie._id}
                                    >
                                        <Card.Img 
                                            className="moviecard-image"
                                            style={{ width: "16rem" }}
                                            variant="top"
                                            src={movie.imageURL}
                                        />
                                        <Card.Body className="card-body-favourite">
                                            <Card.Title className="movie-card-title">
                                                <Link to={`/movies/${movie._id}`}>
                                                    <Button 
                                                        className="fv-gotomovie-button" 
                                                        variant="link"
                                                    >
                                                        {movie.title}
                                                    </Button>
                                                </Link>
                                            </Card.Title>

                                        <Button 
                                            onClick={(e) => { this.removeAFavoriteMovie(e, movie) }} 
                                            variant="outline-secondary" 
                                            size="sm" className="profile-button remove-favorite" 
                                            value={movie._id}
                                        >
                                            Remove from List
                                        </Button>
                                    
                                        </Card.Body>
                                    </Card>
                                </Row>
                            );
                        }
                        })}
                        </Row>
                    </div>
                 </div>
            </Container>
        )}

};

export default FavoritesView;