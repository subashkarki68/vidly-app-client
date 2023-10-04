import axios from "../services/axiosSetup";

export const getMovie = (_id) => {
  return axios.get(`/movies/${_id}`);
};

export const getMovies = () => {
  return axios.get(`/movies`);
};

export const deleteMovie = (_id) => {
  return axios.delete(`/movies/${_id}`);
};

export function saveMovie(movie) {
  // If the movie has an _id, it means it already exists in the database,
  // so we should update it. Otherwise, create a new movie.
  if (movie._id) {
    const { ...oldMovieData } = movie;
    const updatedMovie = { ...oldMovieData, genreId: oldMovieData.genreId };
    delete updatedMovie._id;
    delete updatedMovie.genre;
    return axios
      .put(`/movies/${movie._id}`, updatedMovie)
      .then((response) => response.data);
  } else {
    return axios.post(`/movies`, movie).then((response) => response.data);
  }
}

export const handleLoveClick = async (_id, isLoved) => {
  const { data: oldData } = await axios.get(`/movies/${_id}`);
  delete oldData.isLoved;
  const newData = { isLoved: !isLoved, genreId: oldData.genre._id, ...oldData };
  delete newData._id;
  delete newData.genre;
  return axios.put(`/movies/${_id}`, newData);
};
