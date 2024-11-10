import React, { useState } from "react";
import ChatList from "./components/ChatList";
import ChatWindow from "./components/ChatWindow";
import "./App.css";

const App = () => {
  const [chats, setChats] = useState([
    { id: 1, name: "General", messages: [] },
  ]);
  const [currentChat, setCurrentChat] = useState(chats[0]);
  const [newChatName, setNewChatName] = useState("");

  const handleChatSelect = (chat) => {
    setCurrentChat(chat);
  };

  const handleSendMessage = (text) => {
    const newMessage = {
      id: Date.now(),
      text,
      sender: "You",
      timestamp: new Date().toLocaleTimeString(),
    };

    const updatedCurrentChat = {
      ...currentChat,
      messages: [...currentChat.messages, newMessage],
    };
    setCurrentChat(updatedCurrentChat);

    const updatedChats = chats.map((chat) =>
      chat.id === currentChat.id ? updatedCurrentChat : chat
    );
    setChats(updatedChats);

    // Simulating a response from the other person (for now, hardcoded)
    const receivedMessage = {
      id: Date.now() + 1,
      text: "Got your message!",
      sender: "Other Person",
      timestamp: new Date().toLocaleTimeString(),
    };

    const updatedChatWithResponse = {
      ...currentChat,
      messages: [...updatedCurrentChat.messages, receivedMessage],
    };

    setCurrentChat(updatedChatWithResponse);

    const updatedChatsWithResponse = chats.map((chat) =>
      chat.id === currentChat.id ? updatedChatWithResponse : chat
    );
    setChats(updatedChatsWithResponse);
  };

  const handleDeleteMessage = (messageId) => {
    const updatedMessages = currentChat.messages.filter(
      (msg) => msg.id !== messageId
    );
    const updatedCurrentChat = {
      ...currentChat,
      messages: updatedMessages,
    };

    setCurrentChat(updatedCurrentChat);

    const updatedChats = chats.map((chat) =>
      chat.id === currentChat.id ? updatedCurrentChat : chat
    );
    setChats(updatedChats);
  };

  const handleAddChat = (e) => {
    e.preventDefault();
    if (newChatName.trim()) {
      const newChat = {
        id: Date.now(),
        name: newChatName,
        messages: [],
      };
      setChats([...chats, newChat]);
      setNewChatName("");
      setCurrentChat(newChat);
    }
  };

  const handleDeleteChat = (chatId) => {
    const updatedChats = chats.filter((chat) => chat.id !== chatId);
    setChats(updatedChats);

    if (currentChat && currentChat.id === chatId) {
      setCurrentChat(updatedChats.length > 0 ? updatedChats[0] : null);
    }
  };

  return (
    <div className="app-container">
      <div className="chat-sidebar">
        <ChatList
          chats={chats}
          onSelectChat={handleChatSelect}
          onDeleteChat={handleDeleteChat}
        />
        <form onSubmit={handleAddChat} className="add-chat-form">
          <input
            type="text"
            value={newChatName}
            onChange={(e) => setNewChatName(e.target.value)}
            placeholder="New chat name"
            required
          />
          <button type="submit">Add Chat</button>
        </form>
      </div>
      {currentChat ? (
        <ChatWindow
          chat={currentChat}
          onSendMessage={handleSendMessage}
          onDeleteMessage={handleDeleteMessage}
        />
      ) : (
        <div className="chat-window-placeholder">
          Select or create a chat to start messaging
        </div>
      )}
    </div>
  );
};

export default App;
