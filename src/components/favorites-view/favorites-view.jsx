import React from 'react';
import {Card, Row, Col, Button, Container} from 'react-bootstrap';
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
            <Container className="mt-5 ListOfFavs">

                <h1>Favorite Movies</h1>
                <br></br>
    
                <div>
                    {FavoriteMovies && FavoriteMovies.length === 0 && (
                      <div className="text-center">
                        You have no favorite movies.
                      </div>
                    )}
                    <div className="favorites-movies " >
                      <Row md={3} className="g-4">
                      { FavoriteMovies && FavoriteMovies.length > 0 &&
                        movies.map((movie, idx) => {
                          if (
                            movie._id ===
                            FavoriteMovies.find((fav) => fav === movie._id)
                          ) {
                            return (
                              <Col key={idx}>
                                <Card
                                  className="favorites-item card-content"
                                  style={{ width: "16rem" }}
                                  key={movie._id}
                                >
                                  <Card.Img
                                    style={{ width: "18rem" }}
                                    className="movieCard"
                                    variant="top"
                                    src={movie.imageURL}
                                  />
                                  <Card.Body>
                                    <Card.Title className="movie-card-title">
                                      {movie.title}
                                    </Card.Title>
                                    <Button onClick={(e) => { this.removeAFavoriteMovie(e, movie) }} variant="danger" className="profile-button remove-favorite" value={movie._id}> Remove from List</Button>
                                  </Card.Body>
                                </Card>
                              </Col>
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