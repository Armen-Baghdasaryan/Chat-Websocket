import { Route, Routes } from "react-router-dom";
import socketIO from "socket.io-client";
import HomePage from "./components/HomePage/HomePage";
import ChatPage from "./components/ChatPage/ChatPage";
const socket = socketIO.connect(import.meta.env.VITE_BASE_URL);

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="" element={<HomePage socket={socket} />} />
        <Route path="chat" element={<ChatPage socket={socket} />} />
      </Routes>
    </div>
  );
}

export default App;
