import './header.css';
import React from 'react';

class HeaderSearch extends React.Component {
  render() {
    const { updateSearchValue, value } = this.props;
    return (
      <div className="header">
        <div className="header__buttons">
          <button className="header__button header__search-button">Search</button>
          <button className="header__button header__rate-button">Rated</button>
        </div>
        <div className="header__search">
          <input
            value={value}
            onChange={(event) => updateSearchValue(event.target.value)}
            className="header__search-input"
            placeholder="Type to search..."
          ></input>
        </div>
      </div>
    );
  }
}

export default HeaderSearch;
