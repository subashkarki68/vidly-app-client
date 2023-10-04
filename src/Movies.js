import "./Movies.css";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  getMovies,
  deleteMovie,
  handleLoveClick,
} from "./services/movieService";
import { getGenres } from "./services/genreService";
import PaginationApp from "./components/common/paginationApp";
import ListGenres from "./components/common/listGenres";
import { Paginate } from "./utils/paginate";
import _ from "lodash";
import MoviesTable from "./components/moviesTable";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import SearchBox from "./components/common/searchBox";
import { toast } from "react-toastify";

function Movies(props) {
  const defaultActiveGenre = { _id: "default", name: "All Genres" };
  const pageSize = 4;
  const { user } = props;
  const [movies, setMovies] = useState([]);
  const [allGenres, setAllGenres] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [activeGenre, setActiveGenre] = useState(defaultActiveGenre);
  const [sortColumn, setSortInfo] = useState({
    path: "title",
    order: "asc",
  });
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    async function fetchData() {
      try {
        const genresResponse = await getGenres();
        const moviesResponse = await getMovies();

        setAllGenres(genresResponse.data);
        setMovies(moviesResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const genres = [defaultActiveGenre, ...allGenres];

  const searchFilter =
    searchQuery &&
    movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const genreFilter =
    activeGenre._id !== defaultActiveGenre._id
      ? _.filter(movies, { genre: activeGenre })
      : searchFilter || movies;
  const sortedItems = _.orderBy(genreFilter, sortColumn.path, sortColumn.order);
  const displayedMovies = Paginate(sortedItems, activePage, pageSize);
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setActivePage(1);
    setActiveGenre(defaultActiveGenre);
    setSearchQuery(event.target.value);
  };

  const handleSort = (sortColumn) => {
    setSortInfo(sortColumn);
  };

  const handleDelete = async (id) => {
    try {
      await deleteMovie(id);
      setMovies((prevMovies) => prevMovies.filter((movie) => movie._id !== id));
    } catch (error) {
      toast.error("The movie is already deleted");
    }
  };

  const onLove = async (id, isLoved) => {
    try {
      const response = await handleLoveClick(id, isLoved);
      // Update the movies state with the updated movie data from the response
      setMovies((prevMovies) =>
        prevMovies.map((movie) => (movie._id === id ? response.data : movie))
      );
    } catch (error) {
      toast.error("Error updating movie's love status");
    }
  };

  const onPageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const onGenreChange = (genre) => {
    setSearchQuery("");
    setActiveGenre(genre);
    setActivePage(1);
  };

  const onNewMovieClick = () => {
    navigate("/movies/new");
  };

  const renderTable = () => (
    <Container fluid>
      <Row>
        <Col lg="4" xs="12">
          <ListGenres
            listItems={genres}
            selectedItem={activeGenre}
            onItemSelect={onGenreChange}
          />
        </Col>
        <Col>
          {user && (
            <Button
              variant="primary"
              className="mb-4"
              onClick={onNewMovieClick}
            >
              New Movie
            </Button>
          )}
          <h3>
            Showing {searchFilter.length || genreFilter.length} movies in the
            database.
          </h3>
          <SearchBox value={searchQuery} onChange={handleSearchChange} />
          <MoviesTable
            displayedMovies={displayedMovies}
            onDelete={handleDelete}
            onLove={onLove}
            onSort={handleSort}
            sortColumn={sortColumn}
            user={user}
          />
          <div className="m-5 d-flex">
            <PaginationApp
              itemsCount={searchFilter.length || genreFilter.length}
              pageSize={pageSize}
              activePage={activePage}
              onPageChange={onPageChange}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );

  return <>{renderTable()}</>;
}

ListGenres.defaultProps = {
  defaultAll: "All Genre",
};

export default Movies;
