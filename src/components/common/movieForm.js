import { Form, Formik } from "formik";
import FormField from "./formField";
import { getGenres } from "../../services/genreService";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";

const MovieForm = ({ initialValues, validationSchema, onSubmit }) => {
  const [genres, setGenres] = useState([]);
  useEffect(() => {
    async function fetchGenres() {
      try {
        const genresResponse = await getGenres();

        setGenres(genresResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchGenres();
  }, []);

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, isValid }) => (
          <Form>
            <FormField label="Title" name="title" type="text" />
            <FormField
              label="Genre"
              name="genreId"
              type="text"
              isList={true}
              listData={genres}
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
    </>
  );
};

export default MovieForm;
