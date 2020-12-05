const BASE_URL = "https://www.omdbapi.com/?apikey=1320d6a&";

//fetch movies by title
async function fetchMovies(search, type, page = 1) { 
    try {
      const response = await fetch(
        `${BASE_URL}&s=${search}&type=${type}&page=${page}`
      );
      const receivedData = await response.json();
      return receivedData;
    } catch (error) {
      console.log(error);
    }
  }

  //fetch movies by id
async function fetchMoviesById(movieId) { 
    try {
      const response = await fetch(`${BASE_URL}&i=${movieId}`);
      const receivedData = await response.json();
      return receivedData;
    } catch (error) {
      console.log(error);
    }
  }

  export {fetchMoviesById, fetchMovies};