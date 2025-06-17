import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaBook,
  FaUsers,
  FaRecycle,
  FaHandshake,
  FaUniversity,
  FaShieldAlt,
} from "react-icons/fa";

const AboutPage = () => {
  return (
    <div>
      {/* Navigation
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <FaBook className="text-primary me-2" size={24} />
            <span className="fw-bold text-primary">StudMart</span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/how-it-works">
                  How It Works
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  Contact
                </Link>
              </li>
            </ul>
            <div className="d-flex">
              <Link to="/login" className="btn btn-outline-primary me-2">
                Log In
              </Link>
              <Link to="/signup" className="btn btn-primary">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav> */}

      {/* Hero Section */}
      <div className="themeButton text-white py-5">
        <div className="container py-3">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <h1 className="display-4 fw-bold">About StudMart</h1>
              <p className="lead" style={{ color: "#fff" }}>
                We're on a mission to make education more affordable and
                sustainable for students everywhere.
              </p>
            </div>
            <div className="col-lg-6">
              <img
                src={require("./images/Studmart_realistic_marketplace.jpg")}
                alt="Students using StudMart"
                className="img-fluid rounded-3 shadow"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center">
            <h2 className="fw-bold mb-4">Our Story</h2>
            <p className="lead text-muted mb-4">
              StudMart was born out of a simple observation: college students
              waste too much money on resources they only use temporarily.
            </p>
            <p className="mb-4">
              We as a students noticed how many perfectly good textbooks,
              calculators, and lab equipment were being discarded at the end of
              each semester. Meanwhile, incoming students were spending
              thousands on the same items. We created StudMart to solve this
              problem, connecting students who need academic resources with
              those who no longer need them.
            </p>
            {/* <p>Today, StudMart operates across dozens of college campuses, helping thousands of students save money while reducing waste and building community.</p> */}
          </div>
        </div>
      </div>

      {/* Our Mission */}
      <div className="bg-light py-5">
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-lg-8 text-center">
              <h2 className="fw-bold mb-4">Our Mission</h2>
              <p className="lead">
                To create a student-exclusive marketplace that makes education
                more affordable, reduces waste, and fosters a sense of community
                on college campuses.
              </p>
            </div>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4 text-center">
                  <div className="rounded-circle themeButtonOpaq bg-opacity-10 p-3 d-inline-flex mb-3">
                    <FaUsers color="purple" size={30} />
                  </div>
                  <h3 className="h5 fw-bold">Building Community</h3>
                  <p className="card-text">
                    We will connect students with shared academic interests,
                    creating a supportive ecosystem within each campus.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4 text-center">
                  <div className="rounded-circle themeButtonOpaq bg-opacity-10 p-3 d-inline-flex mb-3">
                    <FaRecycle color="purple" size={30} />
                  </div>
                  <h3 className="h5 fw-bold">Environmental Sustainability</h3>
                  <p className="card-text">
                    By extending the lifecycle of academic resources, we prevent
                    thousands of items from ending up in landfills each year.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4 text-center">
                  <div className="rounded-circle themeButtonOpaq bg-opacity-10 p-3 d-inline-flex mb-3">
                    <FaHandshake color="purple" size={30} />
                  </div>
                  <h3 className="h5 fw-bold">Financial Accessibility</h3>
                  <p className="card-text">
                    We believe financial constraints should never prevent
                    students from accessing the tools they need to succeed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How We're Different */}
      <div className="container py-5">
        <h2 className="fw-bold text-center mb-5">How We're Different</h2>
        <div className="row align-items-center mb-5">
          <div className="col-lg-6 mb-4 mb-lg-0">
            <h3 className="fw-bold">Exclusively for Students</h3>
            <p>
              Unlike general marketplaces, StudMart is exclusively for verified
              college students. This creates a safer environment with relevant
              academic resources.
            </p>
            <ul className="list-unstyled">
              <li className="mb-2 d-flex align-items-center">
                <span className="badge bg-success rounded-circle p-2 me-2">
                  <i className="fas fa-check"></i>
                </span>
                Verification of college identity
              </li>
              <li className="mb-2 d-flex align-items-center">
                <span className="badge bg-success rounded-circle p-2 me-2">
                  <i className="fas fa-check"></i>
                </span>
                Campus-specific marketplaces
              </li>
              <li className="d-flex align-items-center">
                <span className="badge bg-success rounded-circle p-2 me-2">
                  <i className="fas fa-check"></i>
                </span>
                Academic-focused categories
              </li>
            </ul>
          </div>
          <div className="col-lg-6">
            <div className="d-flex align-items-center justify-content-center themeButtonOpaq bg-opacity-10 rounded-3 p-4">
              <div className="text-center">
                <FaUniversity className=" mb-3" color="purple" size={50} />
                <h4 className="fw-bold">Campus Verified</h4>
                <p className="mb-0">
                  Every user is verified using their college email and student
                  ID
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row align-items-center flex-lg-row-reverse">
          <div className="col-lg-6 mb-4 mb-lg-0">
            <h3 className="fw-bold">Safe and Secure Transactions</h3>
            <p>
              Safety is our priority. Our platform includes features
              specifically designed to make campus exchanges safe and
              transparent.
            </p>
            <ul className="list-unstyled">
              <li className="mb-2 d-flex align-items-center">
                <span className="badge bg-success rounded-circle p-2 me-2">
                  <i className="fas fa-check"></i>
                </span>
                Designated campus exchange points
              </li>
              <li className="mb-2 d-flex align-items-center">
                <span className="badge bg-success rounded-circle p-2 me-2">
                  <i className="fas fa-check"></i>
                </span>
                User ratings and verification systems
              </li>
              <li className="d-flex align-items-center">
                <span className="badge bg-success rounded-circle p-2 me-2">
                  <i className="fas fa-check"></i>
                </span>
                Secure in-app messaging
              </li>
            </ul>
          </div>
          <div className="col-lg-6">
            <div className="d-flex align-items-center justify-content-center themeButtonOpaq bg-opacity-10 rounded-3 p-4">
              <div className="text-center">
                <FaShieldAlt className="mb-3" color="purple" size={50} />
                <h4 className="fw-bold">Secure Platform</h4>
                <p className="mb-0">
                  Our secure platform protects your information and facilitates
                  safe exchanges
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="bg-light py-5">
        <div className="container">
          <h2 className="fw-bold text-center mb-5">Creator</h2>
          <div className="row g-4">
            {/* 
            <div className="col-md-4">
              <div className="card border-0 shadow-sm text-center h-100">
                <div className="card-body p-4">
                  <div
                    className="square-container"
                    style={{
                      margin: "0 25%",
                      width: "50%",
                      aspectRatio: 1 ,
                      overflow: "hidden",
                      borderRadius: "50%",
                      position: "relative",
                    }}
                  >
                    <img
                      src={require("./images/Simran..jpg")}
                      alt="Team member"
                      style={{
                        position: "absolute",
                        top: "-100px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "auto",
                        height: "500px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <h3 className="h5 fw-bold">Simran Sharma</h3>
                  <p className="text-muted mb-2">Co-Founder</p>
                  <p className="small">
                    Computer Science Student with a passion for sustainable
                    technology solutions.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card border-0 shadow-sm text-center h-100">
                <div className="card-body p-4">
                  <img
                    src={require("./images/logoLakshyaveer.jpg")}
                    alt="Team member"
                    className="rounded-circle mb-3"
                    style={{
                      aspectRatio: 1,
                      width: "50%",
                      backgroundSize: "contain",
                    }}
                  />
                  <h3 className="h5 fw-bold">Team Lakshyaveer</h3>
                  <p className="text-muted mb-2"></p>
                  <p className="small">
                    Software engineering Student with a passion for creating
                    valuble and solution for Society
                  </p>
                </div>
              </div>
            </div> */}
            <div className="col-md-4 mx-auto">
              <div className="card border-0 shadow-sm text-center h-100">
                <div className="card-body p-4">
                  <div
                    className="square-container"
                    style={{
                      margin: "0 25%",
                      width: "50%" /* Set size as needed */,
                      aspectRatio: 1 /* Makes it a perfect square */,
                      overflow: "hidden",
                      borderRadius: "50%",
                      position: "relative",
                    }}
                  >
                    <img
                      src={require("./images/ShivamDixit.jpg")}
                      alt="Team member"
                      style={{
                        position: "absolute",
                        top: "-35px",
                        left: "60%",
                        transform: "translateX(-50%)",
                        width: "auto",
                        height: "500px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <h3 className="h5 fw-bold">Shivam Dixit</h3>
                  <p className="text-muted mb-2">Founder </p>
                  <p className="small">
                    Software engineering Student focused on Creating Solution
                    for Problems via gained skills
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Join Us CTA */}
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center">
            <h2 className="fw-bold mb-3">Join the StudMart Community</h2>
            <p className="lead mb-4">
              Be part of the movement to make education more affordable and
              sustainable
            </p>
            <Link to="/signup" className="btn themeButton btn-lg px-4 me-2">
              Sign Up Now
            </Link>
            <Link to="/contact" className="btn btn-lg px-4 btn-outline-dark">
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white py-4 mt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="d-flex align-items-center mb-3">
                <FaBook className="me-2" size={20} />
                <span className="fw-bold">StudMart</span>
              </div>
              <p className="small">
                A student-exclusive marketplace for buying and selling academic
                resources.
              </p>
            </div>
            <div className="col-md-6 text-md-end">
              <div className="mb-2">
                <Link
                  to="/privacy"
                  className="text-white text-decoration-none small me-3"
                >
                  Privacy Policy
                </Link>
                <Link
                  to="/terms"
                  className="text-white text-decoration-none small me-3"
                >
                  Terms of Use
                </Link>
                <Link
                  to="/contact"
                  className="text-white text-decoration-none small"
                >
                  Contact Us
                </Link>
              </div>
              <p className="small">
                &copy; {new Date().getFullYear()} StudMart. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;
