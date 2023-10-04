import * as Yup from "yup";
import * as ADR from "./rules/accountDetailRules";
import * as MDR from "./rules/movieDetailRules";

const loginValidationSchema = Yup.object({
  email: ADR.emailValidation,
  password: ADR.passwordValidation,
});

const registrationValidationSchema = Yup.object({
  username: ADR.usernameValidation,
  password: ADR.passwordValidation,
  repeatPassword: ADR.repeatPasswordValidation,
  email: ADR.emailValidation,
  name: ADR.nameValidation,
});

const movieValidationSchema = Yup.object({
  title: MDR.movieTitleValidation,
  genreId: MDR.genreValidation,
  numberInStock: MDR.numberInStockValidation,
  dailyRentalRate: MDR.dailyRentalRateValidation,
});

export {
  loginValidationSchema,
  registrationValidationSchema,
  movieValidationSchema,
};
