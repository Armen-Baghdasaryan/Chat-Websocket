import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { USER_NAME } from "/src/common/constants.js";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const HomePage = ({ socket }) => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem(USER_NAME, name);

    if (name.trim()) {
      socket.emit("join", {
        name: name,
        id: Date.now().toString(),
        socketID: socket.id,
      });
    }

    navigate("/chat");
    setName("");
  };

  // test
  async function getData() {
    const response = await fetch(`${BASE_URL}/todos`);
    const data = await response.json();
    console.log(data);
  }

  useEffect(() => {
    getData();
  }, []);
  // test

  return (
    <div className="home-page" style={{ flexDirection: "column", gap: "32px" }}>
      <form onSubmit={handleSubmit} className="home-form">
        <label>Join to chat</label>
        <input
          type="text"
          value={name}
          className="form-input"
          placeholder="Enter name"
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" className="app-btn" disabled={!name}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default HomePage;
