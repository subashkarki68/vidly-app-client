import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMovie, saveMovie } from "../services/movieService";
import FormCard from "./common/formCard";
import MovieForm from "./common/movieForm";
import { movieValidationSchema } from "../schemas/validationSchemas";

const MovieDetail = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const [isMovieFetched, setIsMovieFetched] = useState(false);
  const [movie, setMovie] = useState({
    // Set initial values to match the expected structure
    _id: "",
    title: "",
    numberInStock: 0,
    dailyRentalRate: 0,
    genre: { _id: "", name: "" },
  });

  const handleSave = async (newMovieData) => {
    try {
      const updatedMovie = { ...newMovieData };
      await saveMovie(updatedMovie);
      navigate("/movies");
    } catch (error) {
      console.error("Error saving movie:", error);
      return <h1>Error Saving Movie</h1>;
    }
  };

  //If there are no movie with the _id navigate to Not Found page
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const fetchedMovie = await getMovie(_id);
        if (!fetchedMovie) {
          navigate("/not-found");
        } else {
          setMovie(fetchedMovie.data);
          setIsMovieFetched(true);
        }
      } catch (error) {
        navigate("/not-found");
        console.error("Error fetching movie:", error);
      }
    };

    fetchMovie(); // Call the async function to fetch the movie.
  }, [_id, navigate]);

  return (
    <div>
      {isMovieFetched && ( // Render MovieForm only when movie data is fetched
        <>
          <FormCard>
            <h3 className="text-center">Movie Detail: {movie.title}</h3>
            <MovieForm
              initialValues={{
                ...movie,
                genreId: movie.genre._id,
              }}
              validationSchema={movieValidationSchema}
              onSubmit={handleSave}
            />
          </FormCard>
        </>
      )}
    </div>
  );
};

export default MovieDetail;
