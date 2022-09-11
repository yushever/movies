import React from "react";
import MovieList from "../movie-list/movie-list";
import GetMovies from "../../services/service";
import "./app.css";

class App extends React.Component {
  getMovies = new GetMovies();

  constructor() {
    super();
    this.updateMovie();
  }

  state = {
    moviesData: [],
  };

  updateMovie() {
    this.getMovies.getAllMovies().then((movies) => {
      this.setState({
        moviesData: movies,
      });
    });
  }

  render() {
    return (
      <div>
        <MovieList movies={this.state.moviesData} />
      </div>
    );
  }
}

export default App;
