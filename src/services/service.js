export default class GetMovies {
  debounce(func, delay = 1000) {
    let timeoutId;

    return async function (...args) {
      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  }

  async getResource(url) {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Error ${res.status}`);
    }
    const body = await res.json();
    return body;
  }

  debounced = this.debounce(this.getResource);

  async getAllMovies(searchInput) {
    if (searchInput === null || searchInput === '') {
      return [];
    }
    const res = await this.getResource(
      `https://api.themoviedb.org/3/search/movie?api_key=f0f65e607fe0520c21899abdded8460f&query=${searchInput}&page=1`
    );
    // console.log(res);

    return res.results;
  }
}

// const movies = new GetMovies();

// movies.getAllMovies().then((m) => {
//   console.log(m);
// });
