import * as Yup from "yup";

const usernameValidation = Yup.string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username can't exceed 20 characters")
    .matches(
        /^[a-zA-Z0-9_-]*$/,
        "Username can only contain letters, numbers, underscores, and hyphens"
    );

const passwordValidation = Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters");

const repeatPasswordValidation = Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Repeat Password is required");

const emailValidation = Yup.string()
    .required("Email is required")
    .email("Invalid email address");

const nameValidation = Yup.string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name can't exceed 50 characters")
    .matches(
        /^[a-zA-Z\s]*$/,
        "Name can only contain letters and spaces"
    );

const movieTitleValidation = Yup.string()
    .required('Movie title is required')
    .min(2, 'Title must be at least 2 characters')
    .max(100, 'Title can\'t exceed 100 characters');

const genreValidation = Yup.string()
    .required('Genre is required');

const numberInStockValidation = Yup.number()
    .required('Number in stock is required')
    .integer('Number must be an integer')
    .positive('Number must be positive');

const dailyRentalRateValidation = Yup.number()
    .required('Daily rental rate is required')
    .min(0, 'Rate must be at least 0')
    .max(10, 'Rate can\'t exceed 10');

export {
    usernameValidation,
    passwordValidation,
    repeatPasswordValidation,
    emailValidation,
    nameValidation,
    movieTitleValidation,
    genreValidation,
    numberInStockValidation,
    dailyRentalRateValidation
};