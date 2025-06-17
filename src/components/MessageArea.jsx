import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Chat from "./subcomponent/Chat";
import "./styles/MessageArea.css";
function MessageArea({ conversation, clientId }) {
  const [isShowApproch, setIsShowApproch] = useState(true);
  const [showChat, setShowChat] = useState(false); // -1 refers to Nothing is showing
  const [activeChat, setActiveChat] = useState({});
  const [unreedChat, setUnreedChat] = useState(0);
  return (
    <div className="message-list">
      <div className="selectTheMessageType">
        <Button
          style={{
            background: "#FFEBCD",
            borderColor: "grey",
            color: "#333333",
          }}
          disabled={!isShowApproch}
          onClick={() => setIsShowApproch(false)}
        >
          My Ads Response
        </Button>{" "}
        <Button
          style={{
            background: "#FFEBCD",
            borderColor: "grey",
            color: "#333333",
          }}
          disabled={isShowApproch}
          onClick={() => setIsShowApproch(true)}
        >
          Me Approched
        </Button>
      </div>
      <div className="messages my-3">
        {conversation.map((chatObj, index) =>
          !isShowApproch
            ? chatObj.product[0]?.seller == clientId && (
                <div
                  onClick={() => {
                    setActiveChat(chatObj);
                    setShowChat(true);
                  }}
                  key={index}
                  className="my-2 w-100 border px-2  d-flex align-items-center message-card"
                >
                  <div
                    className="image my-auto horizontalCard"
                    style={{
                      height: "10vh",
                      aspectRatio: 1,
                      overflow: "hidden",
                      background: "#eae6ff",
                      borderRadius: "50px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={chatObj.otherUser[0].profilePicture}
                      alt="DP"
                      height="100%"
                      // style={{ backgroundSize: "contain" }}
                    />
                  </div>

                  <div className="mx-2 w-100">
                    <h5 className="mx-1">
                      {chatObj.otherUser.length > 1
                        ? "Group"
                        : chatObj.otherUser[0].name}
                      <span
                        style={{
                          color: "grey",
                          float: "right",
                          fontSize: "70%",
                          marginTop: "1%",
                        }}
                      >
                        {chatObj.lastMessage.createdAt.split("T")[0] ===
                        new Date().toISOString().split("T")[0]
                          ? chatObj.lastMessage.createdAt
                              .split("T")[1]
                              .slice(0, 5)
                          : chatObj.lastMessage.createdAt.split("T")[0]}
                      </span>
                    </h5>
                    <p className="mx-2">
                      {(chatObj.lastMessage.sender == clientId
                        ? "You"
                        : chatObj.otherUser[0].name) +
                        " : " +
                        chatObj.lastMessage.content +
                        " "}

                      <span
                        style={{
                          color: chatObj.lastMessage.read
                            ? "#6E6E6E"
                            : "#3F51B5",
                          float: "right",
                        }}
                      >
                        {chatObj.lastMessage.read ? "seen" : "not seened yet"}
                      </span>
                    </p>
                  </div>
                </div>
              )
            : chatObj.product[0]?.seller != clientId && (
                <div
                  onClick={() => {
                    setActiveChat(chatObj);
                    setShowChat(true);
                  }}
                  key={index}
                  className="my-2 w-100 border  px-2 d-flex align-items-center message-card"
                >
                  <div className="horizontalCard">
                    <div
                      className="image my-auto"
                      style={{
                        height: "10vh",
                        aspectRatio: 1,
                        overflow: "hidden",
                        background: "#eae6ff",
                        borderRadius: "50px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src={chatObj.otherUser[0].profilePicture}
                        alt="DP"
                        height="100%"
                        style={{ backgroundSize: "cover" }}
                      />
                    </div>
                  </div>

                  <div className="mx-2 w-100">
                    <h5 className="mx-1">
                      {chatObj.otherUser.length > 1
                        ? "Group"
                        : chatObj.otherUser[0].name}
                      <span
                        style={{
                          color: "grey",
                          float: "right",
                          fontSize: "70%",
                          marginTop: "1%",
                        }}
                      >
                        {chatObj.lastMessage.createdAt.split("T")[0] ===
                        new Date().toISOString().split("T")[0]
                          ? chatObj.lastMessage.createdAt
                              .split("T")[1]
                              .slice(0, 5)
                          : chatObj.lastMessage.createdAt.split("T")[0]}
                      </span>
                    </h5>
                    <p className="mx-2">
                      {(chatObj.lastMessage.sender == clientId
                        ? "You"
                        : chatObj.otherUser[0].name) +
                        " : " +
                        chatObj.lastMessage.content +
                        " "}
                      {chatObj.lastMessage.read ? (
                        <span style={{ color: "#6E6E6E", float: "right" }}>
                          seen
                        </span>
                      ) : (
                        <span style={{ color: "#3F51B5", float: "right" }}>
                          not seened yet
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              )
        )}
      </div>
      {/* Chat Ground */}
      <Modal
        show={showChat}
        onHide={() => setShowChat(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton closeVariant="Close" closeLabel="Cancel">
          <Modal.Title>Chat with Seller</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Chat
            recipientId={activeChat._id && activeChat._id.otherUser}
            productId={activeChat._id && activeChat._id.product}
            productData={
              activeChat && activeChat.product && activeChat.product[0]
            }
            recipientInfo={
              activeChat && activeChat.otherUser && activeChat.otherUser[0]
            }
          />
        </Modal.Body>
      </Modal>
      <div className="message-recieved"></div>
    </div>
  );
}

export default MessageArea;
