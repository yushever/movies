import _ from 'lodash';

export default class GetMovies {
  async getResource(url) {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Error ${res.status}`);
    }
    const body = await res.json();
    return body;
  }

  debounced = _.debounce(async (url) => await this.getResource(url), 2000, { leading: true });

  async getAllMovies(searchInput) {
    if (searchInput === null || searchInput === '') {
      return [];
    }
    const res = await this.debounced(
      `https://api.themoviedb.org/3/search/movie?api_key=f0f65e607fe0520c21899abdded8460f&query=${searchInput}&page=1`
    );
    console.log(res);

    return res.results;
  }
}

// const movies = new GetMovies();

// movies.getAllMovies().then((m) => {
//   console.log(m);
// });
