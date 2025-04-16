import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaBook, FaEnvelope, FaLock } from "react-icons/fa";
import { useAuth } from "../context/context";
const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { setCurrentUser } = useAuth();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  // Demonic Screem...
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...formData,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          localStorage.setItem("token", response.token);
          setCurrentUser(response.user);
          alert("Login Successfull Hello " + response.user.name);
          navigate("/Dashboard");
        } else {
          console.log("Login failed:", response.error);
          alert("Login Unsuccessfull");
        }
      })
      .catch((err) => {
        console.log("Error from login fetch api", err);
      });
    console.log("Login form submitted:", formData);
  };

  return (
    <div>
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <FaBook className="text-primary me-2" size={24} />
            <span className="fw-bold text-primary">StudMart</span>
          </Link>
        </div>
      </nav>

      {/* Login Form */}
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card shadow-sm border-0">
              <div className="card-body p-4 p-md-5">
                <div className="text-center mb-4">
                  <h2 className="fw-bold">Welcome Back!</h2>
                  <p className="text-muted">
                    Sign in to access your StudMart account
                  </p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email address
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light">
                        <FaEnvelope />
                      </span>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="college.email@edu.in"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-text">
                      Use your college email address
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <label htmlFor="password" className="form-label">
                        Password
                      </label>
                      <Link
                        to="/forgot-password"
                        className="text-decoration-none small"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <div className="input-group">
                      <span className="input-group-text bg-light">
                        <FaLock />
                      </span>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="rememberMe"
                    />
                    <label className="form-check-label" htmlFor="rememberMe">
                      Remember me
                    </label>
                  </div>

                  <div className="d-grid mb-4">
                    <button type="submit" className="btn btn-primary btn-lg">
                      Log In
                    </button>
                  </div>

                  <div className="text-center">
                    <p className="mb-0">
                      Don't have an account?{" "}
                      <Link
                        to="/signup"
                        className="text-decoration-none fw-medium"
                      >
                        Sign up
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-light py-3 mt-auto">
        <div className="container">
          <div className="text-center text-muted small">
            &copy; {new Date().getFullYear()} StudMart. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;
