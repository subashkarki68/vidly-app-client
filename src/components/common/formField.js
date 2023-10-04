import React from "react";
import { Field, ErrorMessage } from "formik";

const FormField = ({ label, name, type, isList, listData }) => {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <Field
        type={type}
        id={name}
        name={name}
        className="form-control"
        autoComplete={name}
        as={isList ? "select" : "input"} // Render as select if isList is true
      >
        {isList && (
          <>
            <option value="">Select a genre</option>
            {listData.map((genre) => (
              <option key={genre._id} value={genre._id}>
                {genre.name}
              </option>
            ))}
          </>
        )}
      </Field>
      <ErrorMessage name={name} component="div" className="text-danger mt-2" />
    </div>
  );
};

export default FormField;
