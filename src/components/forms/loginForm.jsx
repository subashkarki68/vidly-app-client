import React from "react";
import { Formik, Form } from "formik";
import Button from "react-bootstrap/Button";
import FormCard from "../common/formCard";
import { loginValidationSchema } from "../../schemas/validationSchemas";
import FormField from "../common/formField";
import authApi from "../../services/authService";
import { useLocation, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      await authApi.login(values.email, values.password);
      // Check if there's a redirectTo query parameter in the URL
      const redirectTo = new URLSearchParams(location.search).get("redirectTo");
      navigate(redirectTo || "/");
      window.location.reload();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        //User Credentials is not correct
        setErrors({ password: error.response.data });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <FormCard>
      <h1 className="mb-5">Login</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={loginValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, isValid }) => (
          <Form>
            <FormField label="Email" name="email" type="text" />
            <FormField label="Password" name="password" type="password" />

            <Button
              className="mt-4 btn-primary btn-block"
              type="submit"
              disabled={!isValid || isSubmitting}
            >
              {isSubmitting ? "Logging In..." : "Login"}
            </Button>
          </Form>
        )}
      </Formik>
    </FormCard>
  );
};

export default LoginForm;
