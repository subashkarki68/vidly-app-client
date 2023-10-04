import React from "react";
import { Formik, Form } from "formik";
import { Button } from "react-bootstrap";
import FormCard from "../common/formCard";
import FormField from "../common/formField";
import { newMovieFormValidationSchema } from "../../schemas/validationSchemas";
import { getGenres } from "../../services/genreService";
import { saveMovie } from "../../services/fakeMovieService";
import { useNavigate } from "react-router-dom";

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
    navigate("/");
  };
  return (
    <FormCard>
      <h1 className="mb-5">Movie</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={newMovieFormValidationSchema}
        // onSubmit={handleMovieAdd}
        onSubmit={(movie) => {
          handleMovieAdd(movie);
        }}
      >
        {({ isSubmitting, isValid }) => (
          <Form>
            <FormField label="Title" name="title" type="text" />
            <FormField
              label="Genre"
              name="genreId"
              type="text"
              isList={true}
              listData={getGenres()}
            />
            <FormField
              label="Number in Stock"
              name="numberInStock"
              type="number"
            />
            <FormField
              label="Daily Rental Rate"
              name="dailyRentalRate"
              type="number"
            />

            <Button
              className="mt-4 btn-primary btn-block"
              type="submit"
              disabled={!isValid || isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
          </Form>
        )}
      </Formik>
    </FormCard>
  );
};

export default NewMovieForm;
