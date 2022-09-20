import './movie.css';
import React from 'react';
import { format } from 'date-fns';

class Movie extends React.Component {
  truncText(text, symbols) {
    if (text.length <= symbols) {
      return text;
    } else {
      text = text.substring(0, symbols + 5);
      let lastSpace = text.lastIndexOf(' ');
      return text.substring(0, lastSpace) + '...';
    }
  }

  render() {
    const { movie } = this.props;
    const urlPic = movie.poster_path;
    let date;
    if (movie.release_date && movie.release_date != '') {
      date = format(new Date(movie.release_date), 'MMMM dd, yyyy');
    }

    return (
      <div className="film">
        <li className="film__item">
          <div className="wrapper">
            <div className="wrapper__image">
              <img
                className="film__image"
                src={`https://image.tmdb.org/t/p/original${urlPic}`}
                alt={`${movie.title} banner`}
              ></img>
            </div>
            <div className="wrapper__info">
              <h2 className="film__title">{this.truncText(movie.title, 20)}</h2>
              <span className="film__date">{date}</span>
              <ul className="film__genres">
                <li className="film__genre">Action</li>
                <li className="film__genre">Drama</li>
              </ul>
              <p className="film_overview">{this.truncText(movie.overview, 210)}</p>
            </div>
          </div>
        </li>
      </div>
    );
  }
}

export default Movie;
