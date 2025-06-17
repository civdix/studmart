import React from "react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import "./styles/LandingPage.css"; // Assuming you have a CSS file for styles
import { Link } from "react-router-dom";
function LandingPageMain() {
  const bestForNewbie = [
    {
      name: "Laptop",
      image: "Laptop.webp",
      price: 25000,
    },
    {
      name: "Drafter",
      image: "Drafter.png",
      price: 150,
    },
    {
      name: "Bike",
      image: "Bike.png",
      price: 20000,
    },
    {
      name: "Quantum Books",
      image: "Quantum.jpg",
      price: 50,
    },
    {
      name: "Mobile",
      image: "Mobile.webp",
      price: 8000,
    },
    {
      name: "RAM and SSD",
      image: "RAM&SSD.webp",
      price: 1200,
    },
    {
      name: "Headphones",
      image: "Headphones.png",
      price: 300,
    },
    {
      name: "Backpack",
      image: "Backpack.webp",
      price: 300,
    },
    {
      name: "Furniture",
      image: "Furniture.png",
      price: 100,
    },
    {
      name: "Power Bank",
      image: "Powerbank.png",
      price: 400,
    },
  ];
  return (
    <div>
      <div
        className="categories d-flex justify-content-around flex-row align-items-center my-3 mx-auto "
        style={{
          maxWidth: "97vw",
          width: "97vw",
          background:
            "linear-gradient(to right,rgba(57, 229, 241, 0.45),rgba(130, 54, 228, 0.9))",
          padding: "10px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          maxHeight: "150px",
          overflowY: "hidden",
          overflowX: "auto",
          minHeight: "126px",
        }}
      >
        {[
          { Name: "Electronics", url: "Electronics.jpg" },
          { Name: "Clothing", url: "Clothing.jpg" },
          { Name: "Textbooks", url: "books.jpg" },
          { Name: "Furniture", url: "Furniture.jpg" },
          { Name: "Sports", url: "Schoolsports.jpg" },
          { Name: "School Supplies", url: "Schoolsuplies.jpg" },
          { Name: "Sports Equipment", url: "Schoolsports.jpg" },
          { Name: "Musical Instruments", url: "Guitar.jpg" },
          { Name: "Others", url: "Others.jpg" },
        ].map((category, index) => (
          <div
            key={index}
            className="category-card d-flex flex-column align-items-center justify-content-center m-2 "
            style={{
              width: "5vw",
              height: "5vw",
              borderRadius: "10px",
              minWidth: "20px",
              cursor: "pointer",
            }}
          >
            <img
              src={require(`./images/${category.url}`)}
              alt={category.Name}
              className="category-image"
              style={{
                width: "5vw",
                aspectRatio: 1,
                objectFit: "cover",
                backgroundColor: "#f0f0f0",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              }}
            />
            <span
              style={{ fontSize: "100%", marginTop: "6%", fontWeight: "700" }}
            >
              {category.url.split(".")[0].slice(0, 1).toUpperCase() +
                category.url.split(".")[0].slice(1)}
            </span>
          </div>
        ))}
      </div>

      <div className="Slider" style={{ position: "relative" }}>
        <div className="arrow arrow-left">
          <FaArrowAltCircleLeft
            size={30}
            // className="my-auto"
          />
        </div>
        <img
          src={require("./images/SLIDER.jpg")}
          alt="Slider"
          style={{
            width: "100%",
            height: "auto",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          }}
        />
        <div className="arrow arrow-right">
          <FaArrowAltCircleRight size={30} />
        </div>
      </div>

      <div>
        <h2>Best For Newbie(1st Years)</h2>
        <div className="BestForNewbie">
          {bestForNewbie.map((product, index) => {
            return (
              <div className="productCard" key={index}>
                <img
                  src={require(`./images/productNewBie/${product.image}`)}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    borderRadius: "10px",
                  }}
                />
                <div className="product-info" style={{ padding: "5%" }}>
                  <h3 style={{ fontSize: "150%", fontWeight: "700" }}>
                    {product.name}
                  </h3>
                  <p>Price: ₹{product.price}</p>
                </div>
              </div>
            );
          })}{" "}
        </div>
      </div>
      <div className="bg-dark pb-2 ">
        <div
          style={{ marginTop: "5vh" }}
          className="footer  text-white w-100 d-flex flex-row justify-content-around pt-5 position-relative"
        >
          <div className="Studmart ">
            <h1 style={{ color: "white", fontSize: "200%" }}>Studmart</h1>
            <p style={{ color: "grey", fontSize: "100%" }}>
              Buy and Sell your used items with ease.
            </p>
          </div>

          <div className="details d-flex flex-column ">
            <h6>Reach to Us</h6>
            <ul>
              <li>
                {" "}
                <Link
                  to="/About"
                  className="text-secondary"
                  style={{ textDecoration: "none" }}
                >
                  About Us
                </Link>
              </li>
              <li>
                {" "}
                <Link
                  to="/Contact"
                  className="text-secondary"
                  style={{ textDecoration: "none" }}
                >
                  Contact Us
                </Link>
              </li>
              <li>
                {" "}
                <Link
                  to="#"
                  className="text-secondary"
                  style={{ textDecoration: "none" }}
                >
                  Detailed Report
                </Link>
              </li>
            </ul>
          </div>

          <div className=" Legals d-flex flex-column  ">
            <h6>Legals</h6>
            <ul>
              <li>
                {" "}
                <Link
                  to="Privacypolicy"
                  target="_blank"
                  className="text-secondary"
                  style={{ textDecoration: "none" }}
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                {" "}
                <Link
                  to="#"
                  className="text-secondary"
                  style={{ textDecoration: "none" }}
                >
                  Terms and Conditions
                </Link>
              </li>
            </ul>
          </div>

          <div className="Social">
            <h6>Social Links</h6>
            <ul className="d-flex flex-column">
              <li>
                {" "}
                <a
                  href="https://www.linkedin.com/in/shivdix"
                  className="text-secondary"
                  target="_blank"
                  style={{ textDecoration: "none" }}
                >
                  Linkedin
                </a>
              </li>{" "}
              <li>
                {" "}
                <a
                  href="https://www.Youtube.com/@shivdix"
                  className="text-secondary"
                  tabIndex={1}
                  target="_blank"
                  style={{ textDecoration: "none" }}
                >
                  Youtube
                </a>
              </li>{" "}
              <li>
                {" "}
                <a
                  href="https://www.Github.com/civdix"
                  className="text-secondary"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none" }}
                >
                  Github
                </a>
              </li>{" "}
              <li>
                {" "}
                <a
                  href="https://www.instagram.com/shivdixit.00"
                  className="text-secondary"
                  target="_blank"
                  style={{ textDecoration: "none" }}
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-secondary"
                  style={{ textDecoration: "line-through" }}
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="w-100 ">
          <p className="text-center text-light fontSize-100 mt-2 mb-0">
            <p style={{ color: "white", fontSize: "100%" }}>
              &copy; {new Date().getFullYear()} Studmart. All rights reserved.
            </p>
            Made with ❤️ by Shivam Dixit
          </p>
        </div>
      </div>
    </div>
  );
}

export default LandingPageMain;
