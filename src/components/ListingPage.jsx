import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  InputGroup,
  Dropdown,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
const ListItemPage = () => {
  const navigate = useNavigate();

  // State for form fields
  const [itemData, setItemData] = useState({
    title: "",
    description: "",
    condition: "",
    location: "",
    price: "",
    category: "",
    barterPreferences: "",
    images: [],
  });
  const [previewImages, setPreviewImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Categories for dropdown
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

  // Handle image selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    console.log(files);
    // Preview images
    const newPreviewImages = files.map((file) => URL.createObjectURL(file));
    setPreviewImages([...previewImages, ...newPreviewImages]);

    // Store files for upload
    setItemData({
      ...itemData,
      images: [...itemData.images, ...files],
    });

    console.log("Files", files);
  };

  // Remove image from preview and state
  const removeImage = (index) => {
    const updatedPreviews = [...previewImages];
    updatedPreviews.splice(index, 1);
    setPreviewImages(updatedPreviews);

    const updatedImages = [...itemData.images];
    updatedImages.splice(index, 1);
    setItemData({
      ...itemData,
      images: updatedImages,
    });
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setItemData({
      ...itemData,
      [name]: value,
    });
  };

  // Handle category selection
  const handleCategorySelect = (category) => {
    setItemData({
      ...itemData,
      category,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    console.log("Data is :", itemData);
    e.preventDefault();
    setIsSubmitting(true);

    // Create form data for API submission
    const formData = new FormData();
    formData.append("title", itemData.title);
    formData.append("description", itemData.description);
    formData.append("price", itemData.price);
    formData.append("category", itemData.category);
    formData.append("barterPreferences", itemData.barterPreferences);
    formData.append("publishedDate", new Date().toISOString());

    // Append images
    itemData.images.forEach((image, index) => {
      formData.append(`image${index}`, image);
      console.log("Image", image);
    });

    try {
      const response = await fetch("http://localhost:5000/api/s3/uploadImage", {
        method: "POST",
        body: formData,
      });
      const jsonResponseImage = await response.json();

      // Make Push in the item listing database  too
      const listingResponse = await fetch(
        "http://localhost:5000/api/products/addListings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            studenttoken: localStorage.getItem("token"),
          },
          body: JSON.stringify({
            ...itemData,
            images: [jsonResponseImage.AWSName],
          }),
        }
      );
      const jsonResponseListing = await listingResponse.json();

      // Simulate successful API call

      setTimeout(() => {
        setIsSubmitting(false);
        // Redirect to the item page (would use the returned item ID from API)
        alert(JSON.stringify(jsonResponseListing));
        navigate("/dashboard");
      }, 1500);
    } catch (error) {
      console.error("Error posting item:", error);
      setIsSubmitting(false);
      alert("Failed to post item. Please try again.");
    }
  };

  return (
    <>
      <Container className="py-4">
        {/* <Button
          onClick={() => {
            setItemData({
              title: "Usb to Type B otg",
              description: "This is compact and very good usb",
              price: 120,
              category: "Others",
              condition: "New",
              barterPreferences: "Arduino Board",
              images: ["url"],
              location: "281121",
            });
          }}
        >
          Clickme to Populate the form
        </Button> */}
        <Row>
          <Col lg={8} className="mx-auto">
            <Card className="shadow-sm">
              <Card.Header className="themeButton text-white">
                <h1 className="h3 mb-0">List an Item on Studmart</h1>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  {/* User info display */}
                  {/* <Card className="mb-4 bg-light">
                  <Card.Body>
                    <h5>Listing as:</h5>
                    <p className="mb-1">
                      <strong>Name:</strong> {userData.name}
                    </p>
                    <p className="mb-1">
                      <strong>College:</strong> {userData.college}
                    </p>
                    <p className="mb-0">
                      <strong>Contact:</strong> {userData.email}
                    </p>
                  </Card.Body>
                </Card> */}

                  {/* Item Name */}
                  <Form.Group className="mb-3">
                    <Form.Label>Item Title</Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      value={itemData.title}
                      onChange={handleChange}
                      placeholder="Enter a clear, descriptive title"
                      required
                    />
                  </Form.Group>

                  {/* Category */}
                  <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Dropdown className="w-100">
                      <Dropdown.Toggle
                        variant="outline-secondary"
                        className="w-100 text-start"
                      >
                        {itemData.category || "Select a category"}
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="w-100">
                        {categories.map((category) => (
                          <Dropdown.Item
                            key={category}
                            onClick={() => handleCategorySelect(category)}
                          >
                            {category}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </Form.Group>

                  {/* Condition */}
                  <Form.Group className="mb-3">
                    <Form.Label>Condition</Form.Label>
                    <Dropdown className="w-100">
                      <Dropdown.Toggle
                        variant="outline-secondary"
                        className="w-100 text-start"
                      >
                        {itemData.condition || "Select Condition of Item"}
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="w-100">
                        {["New", "Like New", "Good", "Fair", "Poor"].map(
                          (condition) => (
                            <Dropdown.Item
                              key={condition}
                              onClick={() => {
                                setItemData({
                                  ...itemData,
                                  condition: condition,
                                });
                              }}
                            >
                              {condition}
                            </Dropdown.Item>
                          )
                        )}
                      </Dropdown.Menu>
                    </Dropdown>
                  </Form.Group>

                  {/* Location */}
                  {/* Will Update as internally select the Location as COllege From The get user data who is uploading the item */}
                  <Form.Group className="mb-3">
                    <Form.Label>Location Pincode(Remember Pincode)</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>Pincode</InputGroup.Text>
                      <Form.Control
                        type="number"
                        name="location"
                        value={itemData.location}
                        onChange={handleChange}
                        placeholder="Ex:281121"
                        min="000001"
                        max="999999"
                      />
                    </InputGroup>
                  </Form.Group>

                  {/* Description */}
                  <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="description"
                      value={itemData.description}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Describe the item's condition, features, and any other relevant details"
                      required
                    />
                  </Form.Group>

                  {/* Price */}
                  <Form.Group className="mb-3">
                    <Form.Label>Price (₹)</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>₹</InputGroup.Text>
                      <Form.Control
                        type="number"
                        name="price"
                        value={itemData.price}
                        onChange={handleChange}
                        placeholder="0"
                        min="0"
                        step="1"
                        required
                      />
                    </InputGroup>
                  </Form.Group>

                  {/* Barter Preferences */}
                  <Form.Group className="mb-3">
                    <Form.Label>Barter Preferences (Optional)</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="barterPreferences"
                      value={itemData.barterPreferences}
                      onChange={handleChange}
                      rows={2}
                      placeholder="What would you accept in exchange? (e.g., 'Open to trading for programming textbooks')"
                    />
                  </Form.Group>

                  {/* Image Upload */}
                  <Form.Group className="mb-4">
                    <Form.Label>Photos</Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageChange}
                      className="mb-3"
                    />

                    {/* Image Previews */}
                    {previewImages.length > 0 && (
                      <Row className="g-2">
                        {previewImages.map((src, index) => (
                          <Col key={index} xs={6} md={4} lg={3}>
                            <div className="position-relative">
                              <img
                                src={src}
                                alt={`Preview ${index + 1}`}
                                className="img-thumbnail"
                                style={{ height: "100px", objectFit: "cover" }}
                              />
                              <Button
                                variant="danger"
                                size="sm"
                                className="position-absolute top-0 end-0"
                                onClick={() => removeImage(index)}
                              >
                                ×
                              </Button>
                            </div>
                          </Col>
                        ))}
                      </Row>
                    )}
                  </Form.Group>

                  {/* Submission */}
                  <div className="d-grid gap-2">
                    <button
                      className="btn themeButton btn-lg"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Posting..." : "Post Item"}
                    </button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ListItemPage;
