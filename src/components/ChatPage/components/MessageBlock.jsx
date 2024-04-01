import React, { useState } from "react";
import { USER_NAME } from "/src/common/constants.js";

const MessageBlock = ({ socket }) => {
  const [message, setMessage] = useState("");

  const handleSend = (e) => {
    e.preventDefault();

    if (message.trim() && localStorage.getItem(USER_NAME)) {
      socket.emit("message", {
        text: message,
        name: localStorage.getItem(USER_NAME),
        id: Date.now().toString(),
        socketID: socket.id,
      });
    }

    setMessage("");
  };

  const isTyping = () =>
    socket.emit("typing", {
      name: localStorage.getItem(USER_NAME),
      socketID: socket.id,
    });

  return (
    <div className="message-block">
      <form onSubmit={handleSend} className="form-message">
        <input
          className="form-input"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={isTyping}
        />
        <button type="submit" className="app-btn" disabled={!message}>
          Send
        </button>
      </form>
    </div>
  );
};

export default MessageBlock;
