import React from 'react';
import './app.css';
import { Alert } from 'antd';

import MovieList from '../movie-list/movie-list';
import HeaderSearch from '../header/header';
import GetMovies from '../../services/service';
import NetworkState from '../network-state/network-state';

class App extends React.Component {
  getMovies = new GetMovies();

  constructor() {
    super();
    this.updateSearchValue = this.updateSearchValue.bind(this);
    this.onNetworkState = this.onNetworkState.bind(this);
    this.onPage = this.onPage.bind(this);
  }

  componentDidMount() {
    this.getMovies.getAllMoviesGuest().then((res) => console.log(res));
    this.getMovies.getGenres().then((res) => console.log(res));
  }

  state = {
    moviesData: {},
    loading: false,
    error: false,
    searchValue: '',
    network: true,
    page: 1,
    isSearch: true,
    isRate: false,
  };

  onError() {
    this.setState({
      error: true,
      loading: false,
    });
  }

  onNetworkState(param) {
    this.setState({
      network: param,
    });
  }

  onPage(pageNumber) {
    console.log(pageNumber);
    this.setState({
      page: pageNumber,
    });
    this.updateMovie(this.state.searchValue, pageNumber);
  }

  updateSearchValue(newSearchValue) {
    this.setState(() => {
      return {
        searchValue: newSearchValue,
      };
    });
    this.updateMovie(newSearchValue);
  }

  updateMovie(searchValue = '', page = 1) {
    this.setState({
      loading: true,
      error: false,
    });
    this.getMovies
      .getAllMovies(searchValue, page)
      .then((movies) => {
        this.setState({
          moviesData: movies,
          loading: false,
        });
      })
      .catch(() => this.onError());
  }

  getStars = (id) => {
    return (e) => {
      console.log(this.state.moviesData);
      this.getMovies.sendRatingGuest(e, id);
      const idx = this.state.moviesData.results.findIndex((el) => el.id === id);
      const oldMovie = this.state.moviesData.results[idx];
      const newMovie = { ...oldMovie, rating: e };
      const newMovies = [
        ...this.state.moviesData.results.slice(0, idx),
        newMovie,
        ...this.state.moviesData.results.slice(idx + 1),
      ];
      const newResult = { ...this.state.moviesData, results: newMovies };
      console.log(newMovie);
      this.setState(() => {
        return {
          moviesData: newResult,
        };
      });
      console.log(`${id} - ${e}`);
    };
  };

  onRate = () => {
    console.log('rate');
    this.getMovies.showRatedMoviesGuest().then((movies) => {
      this.setState({
        moviesData: movies,
        loading: false,
      });
    });
    this.setState(() => {
      return {
        loading: true,
        isSearch: false,
        isRate: true,
      };
    });
  };

  onSearch = () => {
    console.log('search');
    this.updateMovie(this.state.searchValue);
    this.setState(() => {
      return {
        isSearch: true,
        isRate: false,
      };
    });
  };

  // getStars = (e) => {
  //   let stars = e;
  //   console.log(stars);
  //   return stars;
  // };

  render() {
    return (
      <div className="container">
        <HeaderSearch
          updateSearchValue={this.updateSearchValue}
          value={this.state.searchValue}
          search={this.state.isSearch}
          rate={this.state.isRate}
          onSearch={this.onSearch}
          onRate={this.onRate}
        />

        <NetworkState onNetworkState={this.onNetworkState} />
        {!this.state.network ? (
          <div className="error">
            <Alert message="Упс" description="Нет сети" type="error" showIcon />
          </div>
        ) : (
          <MovieList
            response={this.state.moviesData}
            loading={this.state.loading}
            error={this.state.error}
            onPage={this.onPage}
            onStar={this.getStars}
          />
        )}
      </div>
    );
  }
}

export default App;
