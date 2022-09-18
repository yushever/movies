import './movie-list.css';
import React from 'react';
import { Spin, Alert } from 'antd';

import 'antd/dist/antd.css';
import Movie from '../movie/movie';

class MovieList extends React.Component {
  render() {
    const { movies, loading, error } = this.props;

    const hasData = !(loading || error);

    const err = error ? (
      <div className="error">
        <Alert message="Упс" description="Что-то пошло не так..." type="error" showIcon />
      </div>
    ) : null;
    const spinner = loading ? <Spin className="spinner" /> : null;
    const content = hasData ? <MovieView movies={movies} /> : null;

    return (
      <div className="films">
        {err}
        {spinner}
        {content}
      </div>
    );
  }
}

const MovieView = ({ movies }) => {
  const elements = movies.map((movie) => {
    return (
      <div key={movie.id}>
        <Movie movie={movie} />
      </div>
    );
  });
  return <ul className="film-container">{elements}</ul>;
};

export default MovieList;
