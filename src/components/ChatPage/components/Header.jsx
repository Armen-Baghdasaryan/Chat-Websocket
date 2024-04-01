import React from "react";
import { useNavigate } from "react-router-dom";
import { USER_NAME } from "/src/common/constants.js";

const Header = ({ socket }) => {
  const navigate = useNavigate();

  const handleLeave = () => {
    socket.emit("leave", {
      name: localStorage.getItem(USER_NAME),
      socketID: socket.id,
    });

    localStorage.removeItem(USER_NAME);
    navigate("/");
  };

  return (
    <div className="header">
      <button className="app-btn exit-btn" onClick={handleLeave}>
        Leave Chat
      </button>
    </div>
  );
};

export default Header;
