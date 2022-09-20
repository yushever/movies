import './movie-list.css';
import React from 'react';
import { Spin, Alert, Pagination } from 'antd';

import 'antd/dist/antd.css';
import Movie from '../movie/movie';

class MovieList extends React.Component {
  render() {
    const { response, loading, error, onPage } = this.props;
    const movies = response.results;

    const hasData = !(loading || error);

    const err = error ? (
      <div className="error">
        <Alert message="Упс" description="Что-то пошло не так..." type="error" showIcon />
      </div>
    ) : null;
    const spinner = loading ? <Spin className="spinner" /> : null;
    const content = hasData ? <MovieView movies={movies} /> : null;
    const pagination =
      response.total_pages && response.total_pages > 1 ? (
        <Pagination total={response.total_results} defaultPageSize={20} showSizeChanger={false} onChange={onPage} />
      ) : null;

    return (
      <div className="film-content">
        <div className="films">
          {err}
          {spinner}
          {content}
        </div>
        {pagination}
      </div>
    );
  }
}

const MovieView = ({ movies }) => {
  if (!movies) {
    return null;
  }
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
