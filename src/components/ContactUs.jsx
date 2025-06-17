import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaBook,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaUser,
  FaPaperPlane,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { FaX, FaXTwitter } from "react-icons/fa6";
const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [faq, setFaq] = useState(null);
  const [status, setStatus] = useState({
    submitting: false,
    success: null,
    error: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, success: null, error: null });

    try {
      // Replace with your actual API endpoint
      const response = await fetch("https://api.example.com/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setStatus({
        submitting: false,
        success:
          "Your message has been sent successfully. We will get back to you soon!",
        error: null,
      });

      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      console.log("Success:", data);
    } catch (error) {
      console.error("Error:", error);
      setStatus({
        submitting: false,
        success: null,
        error:
          "There was a problem sending your message. Please try again later.",
      });
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="themeButton text-white py-5">
        <div className="container py-3">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <h1 className="display-4 fw-bold">Contact Us</h1>
              <p className="lead text-white">
                Have questions or feedback? We'd love to hear from you!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="container py-5">
        <div className="row g-5">
          {/* Contact Information */}
          <div className="col-lg-4">
            <h2 className="fw-bold mb-4">Get In Touch</h2>
            <p className="mb-4">
              Have a question or need assistance? Contact our team using the
              form or reach out directly through the contact information below.
            </p>

            <div className="d-flex mb-4">
              <div className="flex-shrink-0">
                <a
                  target="_blank"
                  href="mailto:dixitshivam249@gmail.com"
                  className="rounded-circle themeButtonOpaq bg-opacity-10 p-3 d-flex align-items-center justify-content-center"
                  style={{ width: "50px", height: "50px" }}
                >
                  <FaEnvelope color="purple" />
                </a>
              </div>
              <div className="ms-3">
                <h5 className="fw-bold mb-1">Email Us</h5>
                <p className="mb-0">dixitshivam249@gmail.com</p>
              </div>
            </div>

            <div className="d-flex mb-4">
              <div className="flex-shrink-0">
                <div
                  className="rounded-circle themeButtonOpaq bg-opacity-10 p-3 d-flex align-items-center justify-content-center"
                  style={{ width: "50px", height: "50px" }}
                >
                  <a href="tel:+919720965985" target="_blank">
                    <FaPhone color="purple" />
                  </a>
                </div>
              </div>
              <div className="ms-3">
                <h5 className="fw-bold mb-1">Call Us</h5>
                <p className="mb-0">+91 9720965985</p>
              </div>
            </div>

            <div className="d-flex mb-4">
              <div className="flex-shrink-0">
                <a
                  target="_blank"
                  href="https://maps.app.goo.gl/ASshRVAoPEVCjjhAA"
                  className="rounded-circle themeButtonOpaq bg-opacity-10 p-3 d-flex align-items-center justify-content-center"
                  style={{ width: "50px", height: "50px" }}
                >
                  <FaMapMarkerAlt color="purple" />
                </a>
              </div>
              <div className="ms-3">
                <h5 className="fw-bold mb-1">Visit Us</h5>
                <p className="mb-0">
                  Innovation Room <br />
                  BSA College of Engineering and Technology
                </p>
              </div>
            </div>

            <h4 className="fw-bold mt-5 mb-3">Follow Us</h4>
            <div className="d-flex gap-3">
              <a href="#">
                <FaFacebook color="blue" size={25} style={{ margin: 0 }} />
              </a>
              <a
                href="#"
                style={{
                  backgroundColor: "black",
                  borderRadius: "6px",
                  width: "25px",
                }}
              >
                {/* <i className="fab fa-twitter"></i> */}
                <FaXTwitter
                  color="white"
                  size={20}
                  style={{ margin: "0 2.5px " }}
                />
              </a>
              <a href="#" className="instagram">
                <FaInstagram size={20} color="white" style={{ margin: 0 }} />
              </a>
              <a href="#">
                <FaLinkedin color="#0A66C2" size={25} style={{ margin: 0 }} />
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4 p-md-5">
                <h2 className="fw-bold mb-4 ">Send Us a Message</h2>

                {status.success && (
                  <div
                    className="alert alert-success alert-dismissible fade show"
                    role="alert"
                  >
                    {status.success}
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="alert"
                      aria-label="Close"
                      onClick={() => setStatus({ ...status, success: null })}
                    ></button>
                  </div>
                )}

                {status.error && (
                  <div
                    className="alert alert-danger alert-dismissible fade show"
                    role="alert"
                  >
                    {status.error}
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="alert"
                      aria-label="Close"
                      onClick={() => setStatus({ ...status, error: null })}
                    ></button>
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    {/* Name */}
                    <div className="col-md-6">
                      <label htmlFor="name" className="form-label">
                        Your Name
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
                          placeholder="Enter your name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="col-md-6">
                      <label htmlFor="email" className="form-label">
                        Your Email
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
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    {/* Subject */}
                    <div className="col-12">
                      <label htmlFor="subject" className="form-label">
                        Subject
                      </label>
                      <div className="input-group">
                        <span className="input-group-text bg-light">
                          <i className="fas fa-heading"></i>
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          id="subject"
                          name="subject"
                          placeholder="Enter message subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div className="col-12">
                      <label htmlFor="message" className="form-label">
                        Message
                      </label>
                      <textarea
                        className="form-control"
                        id="message"
                        name="message"
                        rows="5"
                        placeholder="Enter your message here..."
                        value={formData.message}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </div>

                    {/* Submit Button */}
                    <div className="col-12 mt-4">
                      <button
                        type="submit"
                        className="btn themeButtonOpaq btn-lg d-flex align-items-center gap-2"
                        disabled={status.submitting}
                      >
                        {status.submitting ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <FaPaperPlane />
                            <span>Send Message</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-light py-5">
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-lg-8 text-center">
              <h2 className="fw-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-muted">
                Find quick answers to common questions about StudMart
              </p>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="accordion" id="faqAccordion">
                <div className="accordion-item border-0 mb-3 shadow-sm">
                  <h2 className="accordion-header" id="headingOne">
                    <button
                      onClick={() => {
                        faq != 1 ? setFaq(1) : setFaq(0);
                      }}
                      className={
                        faq == 1
                          ? "accordion-button themeButtonOpaq"
                          : "accordion-button collapsed"
                      }
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      How do I verify my student status?
                    </button>
                  </h2>
                  <div
                    id="collapseOne"
                    className={
                      faq == 1
                        ? "accordion-collapse collapse show"
                        : "accordion-collapse collapse"
                    }
                    aria-labelledby="headingOne"
                    data-bs-parent="#faqAccordion"
                  >
                    <div className="accordion-body">
                      Verifying your student status is simple. During
                      registration, you'll need to provide your college email
                      address, student ID, and enrollment information. Our
                      system automatically verifies college email domains, and
                      you may be asked to upload a photo of your student ID for
                      additional verification.
                    </div>
                  </div>
                </div>

                <div className="accordion-item border-0 mb-3 shadow-sm">
                  <h2 className="accordion-header" id="headingTwo">
                    <button
                      onClick={() => {
                        faq != 2 ? setFaq(2) : setFaq(0);
                      }}
                      className={
                        faq == 2
                          ? "accordion-button themeButtonOpaq"
                          : "accordion-button collapsed"
                      }
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      How does payment work on StudMart?
                    </button>
                  </h2>
                  <div
                    id="collapseTwo"
                    className={
                      faq == 2
                        ? "accordion-collapse collapse show"
                        : "accordion-collapse collapse"
                    }
                    aria-labelledby="headingTwo"
                    data-bs-parent="#faqAccordion"
                  >
                    <div className="accordion-body">
                      StudMart facilitates direct transactions between students.
                      You can arrange payment methods with the seller, including
                      cash, mobile payment apps, or other methods you both agree
                      on. For safety, we recommend meeting in designated campus
                      exchange zones and confirming the condition of items
                      before completing payment.
                    </div>
                  </div>
                </div>
                <div className="accordion-item border-0 mb-3 shadow-sm">
                  <h2 className="accordion-header" id="headingTwo">
                    <button
                      onClick={() => {
                        faq != 3 ? setFaq(3) : setFaq(3);
                      }}
                      className={
                        faq == 3
                          ? "accordion-button themeButtonOpaq"
                          : "accordion-button collapsed"
                      }
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      Is StudMart available at my college?
                    </button>
                  </h2>
                  <div
                    id="collapseTwo"
                    className={
                      faq == 3
                        ? "accordion-collapse collapse show"
                        : "accordion-collapse collapse"
                    }
                    aria-labelledby="headingTwo"
                    data-bs-parent="#faqAccordion"
                  >
                    <div className="accordion-body">
                      StudMart is expanding rapidly across campuses nationwide.
                      Even if we don't have an official presence at your school
                      yet, you can still sign up with your college email and
                      start using the platform. As more students from your
                      campus join, your local marketplace will grow. Contact us
                      to help establish StudMart as an official resource at your
                      institution!
                    </div>
                  </div>
                </div>
              </div>
            </div>
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

export default ContactPage;
