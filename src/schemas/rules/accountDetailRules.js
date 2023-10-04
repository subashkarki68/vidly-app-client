import * as Yup from 'yup';

export const usernameValidation = Yup.string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username can't exceed 20 characters")
    .matches(
        /^[a-zA-Z0-9_-]*$/,
        "Username can only contain letters, numbers, underscores, and hyphens"
    );

export const passwordValidation = Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters");

export const repeatPasswordValidation = Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Repeat Password is required");

export const emailValidation = Yup.string()
    .required("Email is required")
    .email("Invalid email address");

export const nameValidation = Yup.string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name can't exceed 50 characters")
    .matches(
        /^[a-zA-Z\s]*$/,
        "Name can only contain letters and spaces"
    );
