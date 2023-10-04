import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { NavLink } from "react-router-dom";

const NavBar = ({ user }) => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>Vidly</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/" className="nav-link">
              Movies
            </NavLink>
            <NavLink to="/customers" className="nav-link">
              Customers
            </NavLink>
            <NavLink to="/rentals" className="nav-link">
              Rentals
            </NavLink>
            {!user && (
              <>
                <NavLink to="/login" className="nav-link">
                  Login
                </NavLink>
                <NavLink to="/register" className="nav-link">
                  Register
                </NavLink>
              </>
            )}{" "}
            {user && (
              <>
                <NavLink to="/profile" className="nav-link">
                  {user.name}
                </NavLink>
                <NavLink to="/logout" className="nav-link">
                  Logout
                </NavLink>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
