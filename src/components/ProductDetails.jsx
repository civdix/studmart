import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Modal,
} from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart, FaTrash } from "react-icons/fa";
import Chat from "./Chat";
import { FaMessage } from "react-icons/fa6";
import { useAuth } from "../context/context";
import Loading from "./subcomponent/Loading";
const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loadingData, setLoadingData] = useState({
    customMsg: "Loading the Product Details",
    customLoading: "Btw You're looking Beautiful today",
  });
  const { currentUser, loading, setLoading } = useAuth();
  useEffect(() => {
    fetchProductDetails();
    checkIfFavorite();
  }, [id]);

  const fetchProductDetails = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`);
      const data = await response.json();
      console.log("Fetched data is ", data);
      setProduct(data);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const checkIfFavorite = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/favorites/check/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      setIsFavorite(data.isFavorite);
    } catch (error) {
      console.error("Error checking favorite status:", error);
    }
  };

  const toggleFavorite = async () => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }

    try {
      const method = isFavorite ? "DELETE" : "POST";
      const response = await fetch(
        `http://localhost:5000/api/favorites/${id}`,
        {
          method,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.ok) {
        setIsFavorite(!isFavorite);
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const deleteProduct = async (productId) => {
    setLoading(true);
    let previousLoading = loadingData;
    setLoadingData({
      customMsg: "Deleting the Product",
      customLoading: "The Item will be permanently deleted",
    });
    const response = await fetch(
      `http://localhost:5000/api/products/${productId}`,
      {
        method: "DELETE",
        headers: {
          studenttoken: localStorage.getItem("token"),
        },
      }
    );
    const data = await response.json();
    if (data.success) {
      navigate("/dashboard");
    } else {
      alert("Error deleting product:", data.error);
    }
    setLoading(false);
    setLoadingData(previousLoading);
  };

  if (!product) {
    return <Loading />;
  }

  return !currentUser ? (
    <Loading
      customMsg={loadingData.customMsg}
      customLoading={loadingData.customLoading}
    />
  ) : (
    <Container className="py-5">
      <Row>
        <Col md={6}>
          <div className="product-images">
            <img
              src={product.images[0]}
              alt={product.title || "Product Image Cannot be loaded"}
              className="img-fluid rounded main-image mb-3"
            />
            <Row>
              {product.images.slice(1).map((image, index) => (
                <Col key={index} xs={4}>
                  <img
                    src={image}
                    alt={`${product.title} ${index + 2}`}
                    className="img-fluid rounded thumbnail"
                  />
                </Col>
              ))}
            </Row>
          </div>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start">
                <h2>{product.title}</h2>
                <Button variant="link" onClick={toggleFavorite} className="p-0">
                  {isFavorite ? (
                    <FaHeart className="text-danger" size={24} />
                  ) : (
                    <FaRegHeart size={24} />
                  )}
                </Button>
              </div>
              <h3 className="text-primary mb-4">₹{product.price}</h3>
              <Badge bg="secondary" className="mb-3">
                {product.category}
              </Badge>
              <p className="mb-4">{product.description}</p>
              <div className="mb-4">
                <h5>Condition</h5>
                <p>{product.condition}</p>
              </div>
              <div className="mb-4">
                <h5>Location</h5>
                <p>{product.location}</p>
              </div>
              <div className="mb-4">
                <h5>Seller</h5>
                <p>{product.seller.name}</p>
              </div>
              {currentUser && product.seller._id === currentUser._id ? (
                <Button
                  variant="danger"
                  size="lg"
                  className="w-100 mb-3"
                  onClick={() => deleteProduct(product._id)}
                >
                  <FaTrash className="me-2" />
                  Delete the Product
                </Button>
              ) : (
                <Button
                  variant="primary"
                  size="lg"
                  className="w-100 mb-3"
                  onClick={() => setShowChat(true)}
                >
                  <FaMessage className="me-2" />
                  Chat with the Seller
                </Button>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal
        show={showChat}
        onHide={() => setShowChat(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Chat with Seller</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Chat recipientId={product.seller._id} productId={product._id} />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ProductDetails;
