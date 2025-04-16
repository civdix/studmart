import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { FaPaperPlane } from 'react-icons/fa';

const Chat = ({ recipientId, productId }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [recipientInfo, setRecipientInfo] = useState(null);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        fetchMessages();
        fetchRecipientInfo();
        const interval = setInterval(fetchMessages, 5000); // Poll for new messages every 5 seconds
        return () => clearInterval(interval);
    }, [recipientId, productId]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const fetchMessages = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/messages/${recipientId}/${productId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            const data = await response.json();
            setMessages(data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const fetchRecipientInfo = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/users/${recipientId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            const data = await response.json();
            setRecipientInfo(data);
        } catch (error) {
            console.error('Error fetching recipient info:', error);
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        try {
            const response = await fetch('http://localhost:5000/api/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    recipientId,
                    productId,
                    content: newMessage
                })
            });

            if (response.ok) {
                setNewMessage('');
                fetchMessages();
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <Container className="py-4">
            <Card className="chat-container">
                <Card.Header>
                    <h5 className="mb-0">
                        Chat with {recipientInfo?.name || 'User'}
                    </h5>
                </Card.Header>
                <Card.Body className="messages-container" style={{ height: '400px', overflowY: 'auto' }}>
                    {messages.map((message) => (
                        <div
                            key={message._id}
                            className={`message ${message.senderId === recipientId ? 'received' : 'sent'}`}
                        >
                            <div className={`message-bubble ${message.senderId === recipientId ? 'bg-light' : 'bg-primary text-white'}`}>
                                {message.content}
                            </div>
                            <small className="text-muted">
                                {new Date(message.timestamp).toLocaleTimeString()}
                            </small>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </Card.Body>
                <Card.Footer>
                    <Form onSubmit={handleSendMessage}>
                        <div className="d-flex">
                            <Form.Control
                                type="text"
                                placeholder="Type your message..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                            />
                            <Button type="submit" variant="primary" className="ms-2">
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