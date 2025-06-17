import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Card, Button, Tab, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../src/context/context.js";
import MessageArea from "./MessageArea.jsx";
import { FaMessage, FaPerson, FaShop } from "react-icons/fa6";
import { FaEdit, FaLink, FaTrash, FaUserCheck } from "react-icons/fa";
import EditProfile from "./subcomponent/EditProfile.jsx";
import "./styles/Dashboard.css"; // Assuming you have a CSS file for styling
const Dashboard = () => {
  const [userListings, setUserListings] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [conversation, setConversation] = useState([]);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const navigate = useNavigate();

  const { currentUser, loading, deleteProduct } = useAuth();
  useEffect(() => {
    // Fetch user's listings and transactions
    fetchUserData();
    getAllConversation();
  }, []);
  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      // Add your API endpoints here
      const listingsResponse = await fetch(
        `http://localhost:5000/api/products/getMyListing`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            studenttoken: token,
          },
        }
      );
      //   const transactionsResponse = await fetch(
      //     "http://localhost:5000/api/transactions",
      //     {
      //       headers: {
      //         Authorization: `Bearer ${token}`,
      //       },
      //     }
      //   );
      const listings = await listingsResponse.json(); //Got Products in response
      //   const transactions = await transactionsResponse.json();
      // console.log("listings", listingsResponse);
      setUserListings(listings);
      setTransactions(transactions);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const getAllConversation = async () => {
    try {
      // console.log("Fetching conversations...");
      // console.log("Token:", localStorage.getItem("token"));
      const response = await fetch(
        "http://localhost:5000/api/messages/conversations",
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            studenttoken: localStorage.getItem("token"),
          },
        }
      );
      const responseJson = await response.json();
      setConversation(responseJson);
      console.log(responseJson);
    } catch (e) {
      console.error("Error fetching conversations:", e);
    }
  };
  const [selectedButton, setSelectedButton] = useState(1);
  return (
    <>
      <div className={showEditProfileModal ? "" : "d-none"}>
        <EditProfile user={currentUser} setShow={setShowEditProfileModal} />
      </div>
      <Container className="py-5 position-relative">
        <h2 className="mb-4">My Dashboard</h2>
        <Tab.Container defaultActiveKey="profile">
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link
                    eventKey="profile"
                    className={
                      selectedButton == 1 ? "themeButton" : "text-secondary"
                    }
                    onClick={() => setSelectedButton(1)}
                  >
                    <FaPerson color="purple" /> Profile
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    className={
                      selectedButton == 2 ? "themeButton" : "text-secondary"
                    }
                    onClick={() => setSelectedButton(2)} // I Can also rread the event and on the basis of that event i can omit using number
                    eventKey="listings"
                  >
                    <FaShop color="purple" /> Listings
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item
                  className={
                    selectedButton == 3
                      ? "themeButton d-none"
                      : "d-none text-secondary"
                  }
                  onClick={() => setSelectedButton(3)}
                >
                  <Nav.Link eventKey="transactions">Transactions</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    className={
                      selectedButton == 4 ? "themeButton" : "text-secondary"
                    }
                    onClick={() => setSelectedButton(4)}
                    eventKey="messages"
                  >
                    <FaMessage color="purple" /> Messages
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="listings">
                  <Row>
                    {userListings.length > 0 ? (
                      userListings.map((listing) => (
                        <Col md={4} key={listing._id} className="mb-4">
                          <Card>
                            <Card.Img variant="top" src={listing.images[0]} />
                            <Card.Body>
                              <Card.Title>{listing.title}</Card.Title>
                              <Card.Text>₹{listing.price}</Card.Text>
                              <Button
                                className="themeButton"
                                style={{ borderWidth: 0 }}
                                onClick={() =>
                                  navigate(`/product/${listing._id}`)
                                }
                              >
                                View Details
                              </Button>
                              <Button
                                className=" w-25 float-end"
                                variant="danger"
                                onClick={() => {
                                  deleteProduct(listing._id).then((data) => {
                                    if (data.success) {
                                      setUserListings(
                                        userListings.filter(
                                          (item) => item._id !== listing._id
                                        )
                                      );
                                      navigate("/dashboard");
                                    } else {
                                      alert(
                                        "Error deleting product:",
                                        data.error
                                      );
                                    }
                                  });
                                }}
                              >
                                <FaTrash className="" />
                              </Button>
                            </Card.Body>
                          </Card>
                        </Col>
                      ))
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexDirection: "column",
                          position: "relative",
                          textAlign: "left",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                          }}
                        >
                          <h1 style={{ margin: 0, color: "blueviolet" }}>
                            No Listing
                          </h1>
                          <h1 style={{ margin: 0, color: "purple" }}>
                            {" "}
                            6rch one
                          </h1>
                        </div>
                        <img
                          style={{ position: "absolute", top: "-7vw" }}
                          className="floating"
                          src={require("./images/NoListingALt.png")}
                          alt="No Listing"
                        />
                        <Link to={"/sell"}>
                          <button
                            className="themeButton position-absolute"
                            style={{
                              zIndex: 100,
                              bottom: "-40vh",
                              left: "25vw",
                              height: "50px",
                              borderRadius: "40px",
                              padding: "0 20px",
                              border: "1px solid purple",
                              fontWeight: "bold",
                            }}
                          >
                            Make Your First Listing 🎉
                          </button>
                        </Link>
                      </div>
                    )}
                  </Row>
                </Tab.Pane>
                <Tab.Pane eventKey="transactions">
                  <div className="transactions-list">
                    {transactions.map((transaction) => (
                      <Card key={transaction._id} className="mb-3">
                        <Card.Body>
                          <Card.Title>{transaction.item.title}</Card.Title>
                          <Card.Text>
                            Status: {transaction.status}
                            <br />
                            Amount: ₹{transaction.amount}
                            <br />
                            Date:{" "}
                            {new Date(
                              transaction.createdAt
                            ).toLocaleDateString()}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    ))}
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="messages">
                  {/* Component for the Message Area */}
                  <MessageArea
                    conversation={conversation}
                    clientId={currentUser?._id || "Not found"}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="profile">
                  <div className="w-100 DP  position-relative">
                    <div
                      className="imageHolder   rounded-circle mx-auto d-block"
                      style={{
                        minWidth: "150px",
                        minHeight: "150px",
                        width: "10vw",
                        aspectRatio: "1/1",
                        position: "relative",
                      }}
                    >
                      <div
                        className="overlay position-absolute"
                        style={{
                          right: "0",
                          bottom: "0",
                          // transform: "translate(-50%, -50%)",
                        }}
                      >
                        <FaUserCheck size={33} color="green" />
                      </div>
                      <img
                        className="rounded-circle mx-auto d-block "
                        style={{
                          minWidth: "150px",
                          minHeight: "150px",
                          width: "10vw",
                        }}
                        src={currentUser?.profilePicture}
                        alt="display picture"
                      />
                    </div>
                  </div>
                  <div className="profile-info">
                    <h3>Profile Information</h3>
                    <p>Name: {currentUser?.name}</p>
                    <p>Email: {currentUser?.email}</p>
                    <p>Phone: {currentUser?.phone}</p>
                    <p>
                      College: {currentUser?.college}
                      <br />{" "}
                      <span className="ms-3">
                        {" "}
                        -{"Other Student from Your College Zone "} <FaLink />
                      </span>
                    </p>
                    <Button
                      className="themeButton"
                      style={{ borderWidth: 0 }}
                      onClick={() => setShowEditProfileModal(true)}
                    >
                      <FaEdit className="mb-1" /> Edit Profile
                    </Button>
                  </div>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    </>
  );
};

export default Dashboard;
