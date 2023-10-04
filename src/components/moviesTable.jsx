import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Love from "../components/common/love";
import Table from "../components/common/table";

const MoviesTable = ({
  displayedMovies,
  onLove,
  onDelete,
  onSort,
  sortColumn,
  user,
}) => {
  const isAdmin = user ? user.isAdmin : false;
  const columns = [
    {
      path: "title",
      label: "Title",
      content: (movie) => (
        <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
      ),
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
  ];
  if (user) {
    columns.push({
      key: "love",
      path: "isLoved",
      content: (movie) => (
        <Love isLoved={movie.isLoved} onLove={onLove} id={movie._id} />
      ),
    });
    if (isAdmin) {
      columns.push({
        key: "delete",
        content: (movie) => (
          <Button
            onClick={() => onDelete(movie._id)}
            variant="danger"
            size="sm"
          >
            DELETE
          </Button>
        ),
      });
    }
  }
  return (
    <Table
      columns={columns}
      sortColumn={sortColumn}
      data={displayedMovies}
      onSort={onSort}
      onDelete={onDelete}
      onLove={onLove}
    />
  );
};

export default MoviesTable;
