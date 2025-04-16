import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Tab, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [userListings, setUserListings] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user's listings and transactions
    fetchUserData();
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
      const listings = await listingsResponse.json();
      //   const transactions = await transactionsResponse.json();
      console.log("listings", listingsResponse);
      setUserListings(listings);
      setTransactions(transactions);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <Container className="py-5">
      <h2 className="mb-4">My Dashboard</h2>
      <Tab.Container defaultActiveKey="listings">
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="listings">My Listings</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="transactions">Transactions</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="messages">Messages</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="listings">
                <Row>
                  {userListings.map((listing) => (
                    <Col md={4} key={listing._id} className="mb-4">
                      <Card>
                        <Card.Img variant="top" src={listing.images[0]} />
                        <Card.Body>
                          <Card.Title>{listing.title}</Card.Title>
                          <Card.Text>₹{listing.price}</Card.Text>
                          <Button
                            variant="primary"
                            onClick={() => navigate(`/product/${listing._id}`)}
                          >
                            View Details
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
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
                          {new Date(transaction.createdAt).toLocaleDateString()}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  ))}
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="messages">
                <div className="messages-list">
                  {/* Messages component will be implemented later */}
                  <p>Coming soon...</p>
                </div>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
};

export default Dashboard;
