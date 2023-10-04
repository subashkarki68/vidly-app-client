import './App.css';
import React, { useState } from "react"; // Import necessary dependencies
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { getMovies, deleteMovie, handleLoveClick } from './services/fakeMovieService'; // Import movie-related functions
import { getGenres } from './services/fakeGenreService';
import Button from 'react-bootstrap/Button'; // Import Button component from React Bootstrap
import Love from './common/love'; // Import Love component from React
import PaginationApp from './common/paginationApp';
import ListGenres from './common/listGenres';
import { Paginate } from './utils/paginate'
import _ from 'lodash';

function App() {
  // Initialize the movies state using useState
  const [movies, setMovies] = useState(getMovies());
  const [activePage, setActivePage] = useState(1);
  const defaultGenre = "All Genres";
  const [activeGenre, setActiveGenre] = useState(defaultGenre);
  const pageSize = 4;
  const [numOfMoviesShown, setNumOfMoviesShown] = useState(movies.length);

  let displayedMovies = Paginate(movies, activePage, pageSize);
  // const [displayedMovies, setDisplayedMovies] = useState(Paginate(movies, activePage, pageSize));


  // Handle movie deletion
  const handleDelete = (id) => {
    console.log('delete');
    deleteMovie(id); // Delete movie using provided service function
    console.log(getMovies()); // Log updated movie list
    refreshMovies();
  };

  const onLoveClick = (id) => {
    handleLoveClick(id); // Delete movie using provided service function
    // Refresh the movies list after deletion
    refreshMovies();
  };

  const onPageChange = (pageNumber) => {
    setActivePage(pageNumber);
  }

  const onGenreChange = (genre) => {
    //   setActiveGenre(genre);
    //   console.log('onGenreChange : ' + genre);
    //   setDisplayedMovies(_.filter(movies, { genre: genre }));
    //   setNumOfMoviesShown(displayedMovies.length);
    //   console.log(displayedMovies);
  }

  const refreshMovies = () => setMovies([...getMovies()]);

  // Render the movie table
  function renderTable() {
    return (
      <Container fluid>
        <Row>
          <Col lg="4" xs="12" className="m-4">
            <ListGenres defaultAll={defaultGenre}
              listItems={getGenres()}
              activeGenre={activeGenre}
              onGenreChange={onGenreChange} />
          </Col>
          <Col>
            {/* Display the number of movies */}
            <h1>Showing {numOfMoviesShown} movies in the database.</h1>
            {/* Display the table with movie details */}
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Genre</th>
                  <th>Stock</th>
                  <th>Rate</th>
                  {/* Delete column */}
                  <th></th>
                  {/* Love Column  */}
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {/* Map through movies and display each row */}
                {displayedMovies.map(movie => (
                  <tr key={movie._id}>
                    <td>{movie.title}</td>
                    <td>{movie.genre.name}</td>
                    <td>{movie.numberInStock}</td>
                    <td>{movie.dailyRentalRate}</td>
                    <td>
                      <Love isLoved={movie.isLoved} onLoveClick={onLoveClick} id={movie._id} />
                    </td>
                    <td>
                      {/* Provide delete button for each movie */}
                      <Button onClick={() => handleDelete(movie._id)} variant="danger" size="sm">
                        DELETE
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className='m-5 d-flex'>
              <PaginationApp
                itemsCount={movies.length}
                pageSize={pageSize}
                activePage={activePage}
                onPageChange={onPageChange} />
            </div>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <main className="container">
      {/* Conditionally render movie table or no movies message */}
      {movies.length < 1 ? <h1>There are no Movies in the Database</h1> : renderTable()}
    </main>
  );
}

export default App;
