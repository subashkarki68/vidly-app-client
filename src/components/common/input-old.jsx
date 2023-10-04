import React from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";

const Input = ({
  name,
  value,
  label,
  placeholder,
  error,
  onChange,
  autoFocus,
}) => {
  return (
    <Form.Group className="mb-4" controlId={name}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        type={name}
        autoFocus={autoFocus}
      />
      {error && <div className="alert alert-danger mt-4">{error}</div>}
    </Form.Group>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  autoFocus: PropTypes.bool,
};

export default Input;
