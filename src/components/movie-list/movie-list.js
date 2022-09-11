import "./movie-list.css";
import React from "react";
import Movie from "../movie/movie";

class MovieList extends React.Component {
  render() {
    const { movies } = this.props;

    const elements = movies.map((movie) => {
      return (
        <div key={movie.id}>
          <Movie movie={movie} />
        </div>
      );
    });

    return (
      <div className="films">
        <ul className="film-container">{elements}</ul>
      </div>
    );
  }
}

export default MovieList;
