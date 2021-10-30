import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export default class MainView extends React.Component {

    constructor(){
        super();
        this.state = {
            movies: [
                { id: 1, title: 'Harry Potter and the Philosopher\'s Stone', description:'The film stars Daniel Radcliffe as Harry Potter, with Rupert Grint as Ron Weasley, and Emma Watson as Hermione Granger. Its story follows Harry\'s first year at Hogwarts School of Witchcraft and Wizardry as he discovers that he is a famous wizard and begins his formal wizarding education.', director: {name:'Chris Columbus', bio:'Chris Joseph Columbus is an American film director, producer, and screenwriter. Born in Spangler, Pennsylvania, Columbus studied film at Tisch School of the Arts where he developed an interest in filmmaking.', birthYear: '1958', deathYear:''}, year: '2001', genre:'fantasy', imageURL: 'https://static.wikia.nocookie.net/harrypotter/images/f/fb/PS_poster.jpg/revision/latest?cb=20180318153750', featured: true},
                { id: 2, title: 'Titanic', description:'Titanic is a 1997 American epic romantic disaster movie. It was directed, written, and co-produced by James Cameron. The movie is about the 1912 sinking of the RMS Titanic. ... They fall in love after meeting aboard the ship, but it was not good for a rich girl to fall in love with a poor boy in 1912.', director: { name:'James Cameron', bio:'James Francis Cameron CC is a Canadian film director, producer, screenwriter, editor, artist, and environmentalist who currently lives in New Zealand. He is best known for making science fiction and epic films. Cameron first gained recognition for directing The Terminator', birthYear: '1954', deathYear:''}, year: '1997',  genre:'romance', imageURL: 'https://upload.wikimedia.org/wikipedia/en/1/19/Titanic_%28Official_Film_Poster%29.png', featured: true},
                { id: 3, title: 'La La Land', description:'La La Land is a 2016 American musical romantic comedy-drama film written and directed by Damien Chazelle. It stars Ryan Gosling as a jazz pianist and Emma Stone as an aspiring actress, who meet and fall in love while pursuing their dreams in Los Angeles.', director: {name:'Damien Chazelle', bio:'Damien Sayre Chazelle is an American film director, producer, and screenwriter. He is best known for his films Whiplash, La La Land, and First Man', birthYear: '1985', deathYear:'',}, year: '2016', genre:'musical', imageURL: 'https://media.pathe.nl/nocropthumb/620x955/gfx_content/posters/lalalandposter2.jpg', featured: true}
            ],
            selectedMovie: null
        };
    }

    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
      }

    render() {
        const { movies, selectedMovie } = this.state;

        if (movies.length === 0) return <div className="main-view">The list is empty!</div>;
        return (
            <div className="main-view">
                {selectedMovie
                    ? <MovieView movie={selectedMovie} onBackClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }}/>
                    : movies.map(movie => (
                        <MovieCard key={movie.id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }}/>
                    ))
                }
            </div>
        );
      }


}