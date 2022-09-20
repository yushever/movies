export default class GetMovies {
  async getResource(url) {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Error ${res.status}`);
    }
    const body = await res.json();
    return body;
  }

  async getAllMovies(searchInput, page) {
    if (searchInput === null || searchInput === '') {
      return [];
    }
    const res = await this.getResource(
      `https://api.themoviedb.org/3/search/movie?api_key=f0f65e607fe0520c21899abdded8460f&query=${searchInput}&page=${page}`
    );
    console.log(res);

    return res;
  }
}

// const movies = new GetMovies();

// movies.getAllMovies().then((m) => {
//   console.log(m);
// });
