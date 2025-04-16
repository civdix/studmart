import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaBook,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaIdCard,
  FaLock,
  FaUniversity,
} from "react-icons/fa";

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    rollNumber: "",
    collegeEmail: "",
    password: "",
    confirmPassword: "",
  });
  const [debouncingQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log(formData.college);
      if (formData.college.length >= 3) {
        setDebouncedQuery(formData.college);
      }
    }, 500); // 500ms delay after the user stops typing
    console.log("Chnage SetDebounding");
    // Clean up timeout when input changes or component unmounts
    return () => clearTimeout(timer);
  }, [formData.college]);

  useEffect(() => {
    if (formData.college.length >= 3) {
      fetch(
        `http://localhost:5000/api/get/getCollege?college=${formData.college}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => response.json()) // Call .json() properly
        .then((collegesData) => {
          setCollegeList(collegesData.foundColleges); // Set the correct data
        })
        .catch((error) => console.error("Error fetching colleges:", error));
    }
  }, [debouncingQuery]);
  const [collegeList, setCollegeList] = useState([]);
  const [collegesView, setCollegesView] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }).then((response) => {
        let dataR;
        response.json().then((data) => {
          dataR = data;
        });
        if (response.ok) {
          alert("Sign Up Successfull make Login with your credentials");
          navigate("/login");
        } else {
          alert("Some thing problem");
        }
      });
      console.log("Signup form submitted:", formData);
    } catch (err) {
      alert("SignUp Unsuccessfull");
      console.log("Error in Signup js Handle submit fucntion", err);
    }
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

      {/* Signup Form */}
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-7">
            <div className="card shadow-sm border-0">
              <div className="card-body p-4 p-md-5">
                <div className="text-center mb-4">
                  <h2 className="fw-bold">Create Your StudMart Account</h2>
                  <p className="text-muted">
                    Join the student marketplace for buying and selling academic
                    resources
                  </p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    {/* Full Name */}
                    <div className="col-12">
                      <label htmlFor="name" className="form-label">
                        Full Name
                      </label>
                      <div className="input-group">
                        <span className="input-group-text bg-light">
                          <FaUser />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="col-md-6">
                      <label htmlFor="email" className="form-label">
                        Email
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
                          placeholder="<Yourname>@domain.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="form-text">
                        We'll verify your college email
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="col-md-6">
                      <label htmlFor="phone" className="form-label">
                        Phone Number
                      </label>
                      <div className="input-group">
                        <span className="input-group-text bg-light">
                          <FaPhone />
                        </span>
                        <input
                          type="tel"
                          className="form-control"
                          id="phone"
                          name="phone"
                          placeholder="Enter your phone number"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    {/* College/University */}
                    <div className="col-12">
                      <label htmlFor="college" className="form-label">
                        College/University (Write atleast 3 letter to view
                        suggestion)
                      </label>
                      <div className="input-group">
                        <span className="input-group-text bg-light">
                          <FaUniversity />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          id="college"
                          name="college"
                          onBlur={() => {
                            setTimeout(() => {
                              setCollegesView(false);
                            }, 500);
                          }}
                          placeholder="Enter your college or university name"
                          value={formData.college}
                          onFocus={() => {
                            setCollegesView(true);
                          }}
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                            });
                            handleChange(e);
                          }}
                          required
                        />
                      </div>
                      <div
                        className={
                          collegesView
                            ? "position-absolute"
                            : "position-absolute d-none"
                        }
                      >
                        College: {collegeList.length}
                        {collegeList.length > 0 && (
                          <ul
                            style={{
                              padding: "10px",
                              margin: "5px 0",
                              border: "1px solid #ccc",
                              borderRadius: "4px",
                              maxHeight: "200px",
                              overflowY: "auto",
                              backgroundColor: "white",
                              position: "absolute",
                              width: "fit-content",
                              zIndex: 2,
                            }}
                          >
                            {collegeList.map((college, index) => (
                              <li
                                name="college"
                                value={college.college}
                                key={index}
                                onClick={(e) => {
                                  console.log(
                                    "Clicked College: ",
                                    college.college
                                  ); // Debug here
                                  setFormData({
                                    ...formData, // Keep other state properties
                                    college: college.college, // Update the college
                                  });
                                }}
                                style={{
                                  padding: "5px 10px",
                                  cursor: "pointer",
                                  listStyle: "none",
                                  width: "fit-content",
                                }}
                              >
                                <strong>{college.college}</strong>,{" "}
                                {college.city}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>

                    {/* Roll Number */}
                    <div className="col-md-6">
                      <label htmlFor="rollNumber" className="form-label">
                        Roll Number
                      </label>
                      <div className="input-group">
                        <span className="input-group-text bg-light">
                          <FaIdCard />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          id="rollNumber"
                          name="rollNumber"
                          placeholder="Enter your roll number"
                          value={formData.rollNumber}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    {/* College ID */}
                    <div className="col-md-6">
                      <label htmlFor="collegeEmail" className="form-label">
                        College Email ID
                      </label>
                      <div className="input-group">
                        <span className="input-group-text bg-light">
                          <FaEnvelope />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          id="collegeEmail"
                          name="collegeEmail"
                          placeholder="college.email@edu.in"
                          value={formData.collegeEmail}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    {/* Password */}
                    <div className="col-md-6">
                      <label htmlFor="password" className="form-label">
                        Password
                      </label>
                      <div className="input-group">
                        <span className="input-group-text bg-light">
                          <FaLock />
                        </span>
                        <input
                          type="password"
                          className="form-control"
                          id="password"
                          name="password"
                          placeholder="Create a password"
                          value={formData.password}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="form-text">Minimum 8 characters</div>
                    </div>

                    {/* Confirm Password */}
                    <div className="col-md-6">
                      <label htmlFor="confirmPassword" className="form-label">
                        Confirm Password
                      </label>
                      <div className="input-group">
                        <span className="input-group-text bg-light">
                          <FaLock />
                        </span>
                        <input
                          type="password"
                          className="form-control"
                          id="confirmPassword"
                          name="confirmPassword"
                          placeholder="Confirm your password"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    {/* Terms and Conditions */}
                    <div className="col-12">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="termsCheck"
                          required
                        />
                        <label
                          className="form-check-label"
                          htmlFor="termsCheck"
                        >
                          I agree to the{" "}
                          <Link to="/terms" className="text-decoration-none">
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link to="/privacy" className="text-decoration-none">
                            Privacy Policy
                          </Link>
                        </label>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="col-12 mt-4">
                      <div className="d-grid">
                        <button
                          type="submit"
                          className="btn btn-primary btn-lg"
                        >
                          Create Account
                        </button>
                      </div>
                    </div>

                    {/* Sign In Link */}
                    <div className="col-12 text-center mt-3">
                      <p className="mb-0">
                        Already have an account?{" "}
                        <Link
                          to="/login"
                          className="text-decoration-none fw-medium"
                        >
                          Log In
                        </Link>
                      </p>
                    </div>
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

export default SignupPage;
