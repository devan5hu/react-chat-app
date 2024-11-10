import React, { useState } from "react";

const ChatList = ({ chats, onSelectChat, onDeleteChat }) => {
  const [activeChat, setActiveChat] = useState(null);

  const handleDeleteChat = (chatId) => {
    onDeleteChat(chatId);
    setActiveChat(null); // Close the dropdown after deletion
  };

  const handleToggleMenu = (chatId) => {
    setActiveChat(activeChat === chatId ? null : chatId);
  };

  return (
    <div className="chat-list">
      <h2>Chats</h2>
      {chats.map((chat) => (
        <div
          key={chat.id}
          className="chat-item"
          onClick={() => onSelectChat(chat)}
        >
          <div className="chat-item-content">
            <span>
              {chat.name}{" "}
              {chat.isGroup && <span className="group-label">(Group)</span>}
            </span>
            <div className="chat-actions">
              <button
                className="more-options-button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleMenu(chat.id);
                }}
              >
                &#x22EE;
              </button>
              {activeChat === chat.id && (
                <div className="dropdown-menu">
                  <button
                    onClick={() => handleDeleteChat(chat.id)}
                    className="delete-option"
                  >
                    Delete Chat
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
