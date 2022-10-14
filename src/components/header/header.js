import './header.css';
import React from 'react';
import debounce from 'lodash.debounce';

class HeaderSearch extends React.Component {
  state = {
    value: '',
  };
  debounceSearch = debounce((value) => this.props.updateSearchValue(value), 1000);

  onValueChange = (e) => {
    const value = e.target.value;
    this.setState({ value });
    this.debounceSearch(value);
  };

  render() {
    const { onRate, onSearch, search } = this.props;
    return (
      <div className="header">
        <div className="header__buttons">
          <button className="header__button header__search-button" onClick={onSearch}>
            Search
          </button>
          <button className="header__button header__rate-button" onClick={onRate}>
            Rated
          </button>
        </div>
        <SearchView search={search} value={this.state.value} onValueChange={this.onValueChange} />
        {/* <div className="header__search">
          <input
            value={this.state.value}
            onChange={this.onValueChange}
            className="header__search-input"
            placeholder="Type to search..."
          ></input>
        </div> */}
      </div>
    );
  }
}

const SearchView = ({ search, value, onValueChange }) => {
  if (search) {
    return (
      <div className="header__search">
        <input
          value={value}
          onChange={onValueChange}
          className="header__search-input"
          placeholder="Type to search..."
        ></input>
      </div>
    );
  } else {
    return null;
  }
};

export default HeaderSearch;
