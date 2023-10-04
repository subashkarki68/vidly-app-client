import React from "react";
import { useRoutes } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Movies from "./Movies";
import MovieDetail from "./components/movieDetail";
import NewMovieForm from "./components/forms/newMovieForm";
import NavBar from "./components/navBar";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import LoginForm from "./components/forms/loginForm";
import RegisterForm from "./components/forms/registerForm";
import Logout from "./components/logout";
import authApi from "./services/authService";
import ProtectedRoute from "./components/common/protectedRoute";

const App = () => {
  const user = authApi.getCurrentUser();

  const routes = useRoutes([
    { path: "/", element: <Movies user={user} /> },
    { path: "/login", element: <LoginForm /> },
    { path: "/register", element: <RegisterForm /> },
    { path: "/logout", element: <Logout /> },
    { path: "/movies", element: <Movies user={user} /> },
    {
      path: "/movies/new",
      element: <ProtectedRoute element={<NewMovieForm />} />,
    },
    {
      path: "/movies/:_id",
      element: <ProtectedRoute element={<MovieDetail />} />,
    },
    { path: "/customers", element: <Customers /> },
    { path: "/rentals", element: <Rentals /> },
    { path: "*", element: <NotFound /> },
  ]);
  return (
    <>
      <NavBar user={user} />
      <Container style={{ textAlign: "left" }}>{routes}</Container>
    </>
  );
};

export default App;
