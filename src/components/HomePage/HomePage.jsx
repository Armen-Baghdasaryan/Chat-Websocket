import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { USER_NAME } from "/src/common/constants.js";

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

  //test
  const baseURL = "http://localhost:5000/todos";
  const getResponse = (url) => {
    return fetch(url)
      .then((resp) => resp.json())
      .then((data) => data);
  };

  const [data, setData] = useState([]);

  const handleClick = () => {
    getResponse(baseURL).then((data) => setData(data));
  };
  //test

  return (
    <div className="home-page" style={{ flexDirection: "column", gap: "32px" }}>
      <button onClick={handleClick} className="app-btn">
        Get Data
      </button>

      <div style={{margin: "32px 0"}}>
        {data?.map((item) => (
          <p key={item.id}>{item.title}</p>
        ))}
      </div>

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
