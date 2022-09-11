export default class GetMovies {
  async getResource(url) {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Error ${res.status}`);
    }
    const body = await res.json();
    return body;
  }
  async getAllMovies() {
    const res = await this.getResource(
      "https://api.themoviedb.org/3/search/movie?api_key=f0f65e607fe0520c21899abdded8460f&query=cat"
    );
    return res.results;
  }
}

// const movies = new GetMovies();

// movies.getAllMovies().then((m) => {
//   console.log(m);
// });
