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

  state = {
    moviesData: {},
    loading: false,
    error: false,
    searchValue: '',
    network: true,
    page: 1,
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

  render() {
    return (
      <div className="container">
        <HeaderSearch updateSearchValue={this.updateSearchValue} value={this.state.searchValue} />

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
          />
        )}
      </div>
    );
  }
}

export default App;
