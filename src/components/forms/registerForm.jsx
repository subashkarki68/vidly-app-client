import React from "react";
import FormCard from "../common/formCard";
import { Formik, Form } from "formik";
import { registrationValidationSchema } from "../../schemas/validationSchemas";
import FormField from "../common/formField";
import Button from "react-bootstrap/Button";
import { registerUser } from "../../services/registerService";
import { toast } from "react-toastify";
import authApi from "../../services/authService";

const RegisterForm = () => {
  const initialValues = {
    username: "",
    email: "",
    name: "",
    password: "",
    repeatPassword: "",
  };

  const handleSubmit = async (user, { setSubmitting, setErrors }) => {
    try {
      const { headers } = await registerUser(user);
      authApi.loginWithJwt(headers["x-auth-token"]);
      // Registration was successful
      toast.success("User Registered Successfully");
      window.location = "/";
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // User is already registered, set an error message
        setErrors({ email: error.response.data });
      }
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <FormCard>
      <h1 className="mb-5">Register</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={registrationValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, isValid }) => (
          <Form>
            <FormField label="Username" name="username" type="text" />
            <FormField label="Name" name="name" type="text" />
            <FormField label="Email" name="email" type="text" />
            <FormField label="Password" name="password" type="password" />
            <FormField
              label="Repeat Password"
              name="repeatPassword"
              type="password"
            />

            <Button
              className="mt-4 btn-primary btn-block"
              type="submit"
              disabled={!isValid || isSubmitting}
            >
              {isSubmitting ? "Registering..." : "Register"}
            </Button>
          </Form>
        )}
      </Formik>
    </FormCard>
  );
};

export default RegisterForm;
