import React, { useState } from "react";
import MessageInput from "./MessageInput";

const ChatWindow = ({ chat, onSendMessage, onDeleteMessage }) => {
  const [activeMessage, setActiveMessage] = useState(null);

  const handleDeleteMessage = (messageId) => {
    onDeleteMessage(messageId);
    setActiveMessage(null);
  };

  const handleToggleMenu = (messageId) => {
    setActiveMessage(activeMessage === messageId ? null : messageId);
  };

  return (
    <div className="chat-window">
      <header className="chat-header">{chat.name}</header>
      <div className="message-list">
        {chat.messages.map((msg) => (
          <div
            key={msg.id}
            className={`message ${msg.sender === "You" ? "sent" : "received"}`}
          >
            {msg.sender !== "You" && (
              <div className="avatar">{msg.sender[0]}</div>
            )}
            <div className="message-content">
              <span className="message-text">{msg.text}</span>
              <span className="message-timestamp">{msg.timestamp}</span>
            </div>
            {msg.sender === "You" && (
              <div className="message-actions">
                <button
                  className="more-options-button"
                  onClick={() => handleToggleMenu(msg.id)}
                >
                  &#x22EE;
                </button>
                {activeMessage === msg.id && (
                  <div className="dropdown-menu">
                    <button
                      onClick={() => handleDeleteMessage(msg.id)}
                      className="delete-option"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      <MessageInput onSendMessage={onSendMessage} />
    </div>
  );
};

export default ChatWindow;
