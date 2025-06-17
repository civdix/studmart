import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus, FaSearch, FaUser } from "react-icons/fa";
import { SiGoogleanalytics } from "react-icons/si";
import { IoSettings } from "react-icons/io5";
import { ImProfile } from "react-icons/im";
import { GrContact, GrResources } from "react-icons/gr";
import { MdContactPage, MdOutlineContactSupport } from "react-icons/md";
import { LuContact } from "react-icons/lu";
import { FcGallery } from "react-icons/fc";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
// import Notification from "./Notification";
// import CalcContext from "./calcContext/calcContext";
import { useAuth } from "../context/context";
import { FaDoorOpen, FaRightFromBracket } from "react-icons/fa6";
const NavigationBar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token");
  const { currentUser, setCurrentUser } = useAuth();
  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("token");

    navigate("/");
  };

  return (
    <Navbar bg="light" expand="lg" sticky="top" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src={require("./images/studmart.webp")}
            width="30"
            height="30"
            className="d-inline-block align-top me-2"
            alt="Studmart Logo"
          />
          Studmart
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/search">
              <FaSearch className="me-1" /> Browse Items
            </Nav.Link>
            <Nav.Link as={Link} to="/about">
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/contact">
              Contact
            </Nav.Link>
          </Nav>
          <Nav>
            {isLoggedIn ? (
              <>
                <button className="me-2 listButton rounded">
                  <Link
                    to="/sell"
                    className="text-decoration-none text-dark"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      height: "100%",
                    }}
                  >
                    <FaPlus className="me-1" /> List Item
                  </Link>
                </button>
                <Nav.Link as={Link} to="/dashboard">
                  <FaUser className="me-1" /> Dashboard
                </Nav.Link>
                <Button
                  variant="outline-danger"
                  onClick={handleLogout}
                  style={{
                    padding: "0 5px",
                    position: "relative",
                    right: "-40%",
                  }}
                >
                  <FaRightFromBracket className="me-1" size="30" />
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Button className="themeButton" as={Link} to="/signup">
                  Sign Up
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
