import React from "react";
import FormCard from "../common/formCard";
import { movieValidationSchema } from "../../schemas/validationSchemas";
import { saveMovie } from "../../services/movieService";
import { useNavigate } from "react-router-dom";
import MovieForm from "../common/movieForm";

const NewMovieForm = () => {
  const initialValues = {
    title: "",
    genreId: "",
    numberInStock: "",
    dailyRentalRate: "",
  };

  const navigate = useNavigate();
  const handleMovieAdd = async (movie) => {
    await saveMovie(movie);
    navigate("/movies");
  };
  return (
    <FormCard>
      <h1 className="mb-5">Movie</h1>
      <MovieForm
        initialValues={initialValues}
        validationSchema={movieValidationSchema}
        onSubmit={handleMovieAdd}
      />
    </FormCard>
  );
};

export default NewMovieForm;
