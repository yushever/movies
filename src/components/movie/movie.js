import './movie.css';
import React from 'react';
import { format } from 'date-fns';
import { Rate } from 'antd';

import { Consumer } from '../app/app.js';

class Movie extends React.Component {
  truncText(text, symbols) {
    if (text.length <= symbols) {
      return text;
    } else {
      text = text.substring(0, symbols + 5);
      let lastSpace = text.lastIndexOf(' ');
      return text.substring(0, lastSpace) + '..';
    }
  }

  mapGenres(arrGenres, idGenres) {
    let result = idGenres.map((id) => {
      let temp = arrGenres.filter((genre) => genre.id === id);
      return temp[0].name;
    });
    // console.log(result);

    const elements = result.map((item) => {
      return (
        <li key={Math.random()} className="film__genre">
          {item}
        </li>
      );
    });
    return <ul className="film__genres">{elements}</ul>;
  }

  render() {
    const { movie } = this.props;
    const urlPic = movie.poster_path;
    let date;
    if (movie.release_date && movie.release_date != '') {
      date = format(new Date(movie.release_date), 'MMMM dd, yyyy');
    }
    let classNames = 'film__rate-circle';
    if (movie.vote_average >= 7) {
      classNames += ' rate-top';
    } else if (movie.vote_average < 7 && movie.vote_average >= 5) {
      classNames += ' rate-good';
    } else if (movie.vote_average < 5 && movie.vote_average > 3) {
      classNames += ' rate-medium';
    } else if (movie.vote_average <= 0 && movie.vote_average > 3) {
      classNames += ' rate-low';
    }

    return (
      <Consumer>
        {(genres) => {
          // this.mapGenres(genres.genres, movie.genre_ids);
          return (
            <div className="film">
              <li className="film__item">
                <div className="wrapper">
                  <div className="wrapper__image">
                    <img
                      className="film__image"
                      src={`https://image.tmdb.org/t/p/original${urlPic}`}
                      alt={`${movie.title}`}
                    ></img>
                  </div>
                  <div className="wrapper__info">
                    <div className="wrapper__title">
                      <h2 className="film__title">{this.truncText(movie.title, 15)}</h2>
                      <div className={classNames}>
                        <div className="film__rate">{movie.vote_average.toFixed(1)}</div>
                      </div>
                    </div>
                    <span className="film__date">{date}</span>
                    {this.mapGenres(genres.genres, movie.genre_ids)}
                    <p className="film_overview">{this.truncText(movie.overview, 210)}</p>
                    <Rate count="10" allowHalf="true" value={movie.rating} onChange={this.props.onStar} />
                  </div>
                </div>
              </li>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default Movie;
