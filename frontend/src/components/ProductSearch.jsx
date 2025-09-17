import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Card,
  Button,
  InputGroup,
} from "react-bootstrap";

import { FaSearch, FaFilter } from "react-icons/fa";
import "./styles/products.css";

const ProductSearch = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [filterShow, setFilterShow] = useState(false);

  const categories = [
    "Textbooks",
    "Electronics",
    "Furniture",
    "Clothing",
    "School Supplies",
    "Sports Equipment",
    "Musical Instruments",
    "Others",
  ];

  useEffect(() => {
    fetchProducts();
  }, [category, priceRange, sortBy]);

  const fetchProducts = async () => {
    try {
      let url = `http://localhost:5000/api/products?search=${searchTerm}`;
      if (category !== "all") url += `&category=${category}`;
      if (priceRange !== "all") url += `&priceRange=${priceRange}`;
      if (sortBy) url += `&sortBy=${sortBy}`;
      console.log("Search URL", url);
      const response = await fetch(url);
      const data = await response.json();
      console.log("data", data);
      setProducts(data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();

    fetchProducts();
  };

  return (
    <>
      <div className="categoryBar overflowx">
        {categories.map((cat) => (
          <button
            type="button"
            key={cat}
            className="me-2 mb-2"
            onClick={() => {
              setCategory(cat);
              fetchProducts();
            }}
          >
            {cat}
          </button>
        ))}
      </div>
      <Container className="pt-2">
        <Form onSubmit={handleSearch} className="mb-4">
          <Row className="align-items-center">
            {/* Search Input + Button */}
            <Col xs={10} md={6}>
              <InputGroup className="mediaSearchField">
                <Form.Control
                  type="text"
                  placeholder="Search for items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />{" "}
                <Button
                  className="themeButton"
                  style={{ marginLeft: "3%" }}
                  type="submit"
                >
                  <FaSearch /> Search
                </Button>
              </InputGroup>
            </Col>

            {/* Filter Icon */}
            <Col xs={2} className="d-flex justify-content-end">
              <Button
                className="d-flex align-items-center themeButton"
                onClick={() => setFilterShow(!filterShow)}
              >
                <FaFilter className="me-2" />
                <span className="d-none d-sm-inline">Filter</span>
              </Button>
            </Col>
          </Row>

          {filterShow && (
            <Row className="mt-3">
              <Col md={2}>
                <Form.Group>
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="all">All Categories</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat.toLowerCase()}>
                        {cat}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={2}>
                <Form.Group>
                  <Form.Label>Price Range</Form.Label>
                  <Form.Select
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                  >
                    <option value="all">All Prices</option>
                    <option value="0-500">₹0 - ₹500</option>
                    <option value="501-2000">₹501 - ₹2000</option>
                    <option value="2001-5000">₹2001 - ₹5000</option>
                    <option value="5001+">₹5001+</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={2}>
                <Form.Group>
                  <Form.Label>Sort By</Form.Label>
                  <Form.Select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="newest">Newest First</option>
                    <option value="price_low">Price: Low to High</option>
                    <option value="price_high">Price: High to Low</option>
                    <option value="rating">Rating</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          )}
        </Form>

        {/* Products Section */}
        <Row>
          {products
            ? products.map((product) => (
                <Col md={4} key={product._id} className="mb-4">
                  <Card>
                    <Card.Img
                      variant="top"
                      src={product.images[0]}
                      style={{ height: "200px", objectFit: "contain" }}
                    />
                    <Card.Body>
                      <Card.Title>{product.title}</Card.Title>
                      <Card.Text>
                        <strong>₹{product.price}</strong>
                        <br />
                        {product.description.substring(0, 100)}...
                      </Card.Text>
                      <div className="d-flex justify-content-between align-items-center">
                        <Button
                          className="themeButton"
                          href={`/product/${product._id}`}
                        >
                          View Details
                        </Button>
                        <span className="text-muted">{product.location}</span>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            : "Loading..."}
        </Row>
      </Container>
    </>
  );
};

export default ProductSearch;
