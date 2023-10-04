import * as Yup from 'yup';

export const movieTitleValidation = Yup.string()
    .required('Movie title is required')
    .min(2, 'Title must be at least 2 characters')
    .max(100, 'Title can\'t exceed 100 characters');

export const genreValidation = Yup.string()
    .required('Genre is required');

export const numberInStockValidation = Yup.number()
    .required('Number in stock is required')
    .integer('Number must be an integer')
    .positive('Number must be positive');

export const dailyRentalRateValidation = Yup.number()
    .required('Daily rental rate is required')
    .min(0, 'Rate must be at least 0')
    .max(10, 'Rate can\'t exceed 10');
