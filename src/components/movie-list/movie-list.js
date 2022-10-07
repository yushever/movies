import './movie-list.css';
import React from 'react';
import { Spin, Alert, Pagination } from 'antd';

import 'antd/dist/antd.css';
import Movie from '../movie/movie';

class MovieList extends React.Component {
  render() {
    const { response, loading, error, onPage, onStar } = this.props;
    const movies = response.results;

    const hasData = !(loading || error);

    const err = error ? (
      <div className="error">
        <Alert message="Упс" description="Что-то пошло не так..." type="error" showIcon />
      </div>
    ) : null;
    const warning =
      response.total_results == 0 ? (
        <Alert message="Ой" description="Мы ничего не нашли! Попробуйте еще раз" type="warning" showIcon />
      ) : null;
    const spinner = loading ? <Spin className="spinner" /> : null;
    const content = hasData && !warning ? <MovieView movies={movies} onStar={onStar} /> : null;
    const pagination =
      response.total_pages && response.total_pages > 1 ? (
        <Pagination total={response.total_results} defaultPageSize={20} showSizeChanger={false} onChange={onPage} />
      ) : null;

    return (
      <div className="film-content">
        <div className="films">
          {err}
          {warning}
          {spinner}
          {content}
        </div>
        {pagination}
      </div>
    );
  }
}

const MovieView = ({ movies, onStar }) => {
  if (!movies) {
    return null;
  }
  const elements = movies.map((movie) => {
    return (
      <div key={movie.id}>
        <Movie movie={movie} onStar={onStar(movie.id)} />
      </div>
    );
  });
  return <ul className="film-container">{elements}</ul>;
};

export default MovieList;
