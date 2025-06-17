import React, { useState, useEffect, useRef } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { FaLink, FaPaperPlane } from "react-icons/fa";

import "../styles/Chat.css"; // Import your CSS file for styling
import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/context";
const Chat = ({ recipientId, productId, productData, recipientInfo }) => {
  const itemDeleted = productData ? false : true;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  // const { currentUser } = useAuth();
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    fetchMessages();

    const interval = setInterval(fetchMessages, 5000); // Poll for new messages every 5 seconds
    return () => clearInterval(interval);
  }, [recipientId, productId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // useEffect(async () => {
  //   try {
  //     const response = await fetch(
  //       `http://localhost:5000/api/products/${productId}`
  //     );
  //     const data = await response.json();
  //     if (data) {
  //       setItemDeleted(false);
  //     } else {
  //       setItemDeleted(true);
  //       // navigate("/products");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching product data:", error);
  //   }
  // }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/messages/${recipientId}/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      setMessages(data);
      console.log("Messages:", data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const response = await fetch("http://localhost:5000/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          recipientId,
          productId,
          content: newMessage,
        }),
      });

      if (response.ok) {
        setNewMessage("");
        fetchMessages();
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <Container className="py-4">
      <Card className="chat-container">
        <Card.Header>
          <h5 className="mb-0">
            Product:{" "}
            {productData && productData.title
              ? productData.title.slice(0, 15)
              : "Item Deleted or Sold"}
            {productData && productData.title
              ? productData.title.length > 15
              : ""
              ? "..."
              : ""}
            {productData && productData.title && (
              <FaLink
                className="mx-2"
                cursor={"pointer"}
                onClick={() => {
                  window.open(`/product/${productData._id}`);
                }}
              />
            )}
          </h5>
          {console.log(recipientInfo?.name)}
        </Card.Header>
        <Card.Body
          className={`messages-container ${
            itemDeleted ? "bg-secondary" : "bg-white"
          }`}
          style={{
            height: "400px",
            overflowY: "auto",
          }}
        >
          {messages.map((message) => (
            <div
              key={message._id}
              className={`message ${
                message.sender === recipientId ? "received" : "sent"
              }`}
            >
              <span
                className="text-primary"
                style={{ fontSize: "80%", opacity: 0.8 }}
              >
                {message.sender === recipientId ? recipientInfo?.name : "You"}
              </span>
              <div
                className={`message-bubble ${
                  message.sender === recipientId
                    ? "bg-light"
                    : "bg-primary text-white"
                }`}
              >
                {message.content}
              </div>
              <small className="text-muted">
                {new Date(message.createdAt).toLocaleTimeString()}
              </small>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </Card.Body>
        <Card.Footer>
          <Form onSubmit={!itemDeleted && handleSendMessage}>
            <div className="d-flex">
              <Form.Control
                disabled={itemDeleted}
                type="text"
                placeholder={
                  itemDeleted
                    ? "Can not send Message for this Product"
                    : "Type your message..."
                }
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <Button
                type="submit"
                variant="primary"
                className="ms-2"
                disabled={itemDeleted}
              >
                <FaPaperPlane />
              </Button>
            </div>
          </Form>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default Chat;
