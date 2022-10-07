export default class GetMovies {
  api_key = 'f0f65e607fe0520c21899abdded8460f';
  guest_id = '';

  async getResource(url) {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Error ${res.status}`);
    }
    const body = await res.json();
    return body;
  }

  async postResource(url, rate) {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(rate),
    });

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
      `https://api.themoviedb.org/3/search/movie?api_key=${this.api_key}&query=${searchInput}&page=${page}`
    );
    console.log(res);

    return res;
  }

  async getAllMoviesGuest() {
    const res = await this.getResource(
      `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${this.api_key}`
    );
    this.guest_id = res.guest_session_id;
    return res;
  }

  async sendRatingGuest(rate, movieId) {
    let obj = { value: rate };
    const res = await this.postResource(
      `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=${this.api_key}&guest_session_id=${this.guest_id}`,
      obj
    );
    return res;
  }

  async showRatedMoviesGuest() {
    const res = await this.getResource(
      `https://api.themoviedb.org/3/guest_session/${this.guest_id}/rated/movies?api_key=${this.api_key}`
    );
    return res;
  }

  async getGenres() {
    const res = await this.getResource(`https://api.themoviedb.org/3/genre/movie/list?api_key=${this.api_key}`);
    return res;
  }
}

// const movies = new GetMovies();

// movies.getAllMovies().then((m) => {
//   console.log(m);
// });
