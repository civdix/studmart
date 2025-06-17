import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaBook,
  FaLaptop,
  FaCalculator,
  FaRecycle,
  FaDollarSign,
} from "react-icons/fa";
import Navbar from "./Navbar";
const HomePage = () => {
  return (
    <div>
      {/* Navigation Bar */}
      {/* <Navbar /> */}

      {/* Hero Section */}
      <div className="container py-5 text-center">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <h1 className="display-4 fw-bold mb-4">
              Student-Exclusive Marketplace
            </h1>
            <p className="lead text-muted mb-5">
              Buy and sell study-related items within your college community
            </p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-center">
              <Link
                to="/signup"
                className="btn themeButton btn-lg px-4 me-md-2"
              >
                Join StudMart
              </Link>
              <Link to="/about" className="btn purpleOutline btn-lg px-4">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-light py-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-5">Why Choose StudMart?</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0 hover-shadow">
                <div className="card-body text-center p-4">
                  <div className="rounded-circle themeButtonOpaq bg-opacity-10 p-3 d-inline-flex mb-3">
                    <FaDollarSign color="#343434" size={30} />
                  </div>
                  <h3 className="card-title h5 fw-bold">Save Money</h3>
                  <p className="card-text">
                    Access affordable academic resources from fellow students
                    within your campus.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0 hover-shadow">
                <div className="card-body text-center p-4">
                  <div className="rounded-circle themeButtonOpaq bg-opacity-10 p-3 d-inline-flex mb-3">
                    <FaRecycle color="#343434" size={30} />
                  </div>
                  <h3 className="card-title h5 fw-bold">Reduce Waste</h3>
                  <p className="card-text">
                    Promote sustainability by giving used academic items a
                    second life.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0 hover-shadow">
                <div className="card-body text-center p-4">
                  <div className="rounded-circle themeButtonOpaq bg-opacity-10 p-3 d-inline-flex mb-3">
                    <FaLaptop color="#343434" size={30} />
                  </div>
                  <h3 className="card-title h5 fw-bold">
                    Access Essential Tools
                  </h3>
                  <p className="card-text">
                    Find textbooks, laptops, calculators, and more for your
                    academic success.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center">
            <h2 className="fw-bold mb-3">Ready to start buying and selling?</h2>
            <p className="lead text-muted mb-4">
              Join thousands of students who are already saving money and
              reducing waste
            </p>
            <Link to="/signup" className="btn themeButton btn-lg px-4">
              Get Started Today
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

export default HomePage;
