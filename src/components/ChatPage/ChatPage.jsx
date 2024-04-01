import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import MessageBlock from "./components/MessageBlock";
import Body from "./components/Body";

const ChatPage = ({ socket }) => {
  const [messages, setMessages] = useState([]);
  const [typer, setTyper] = useState({});

  useEffect(() => {
    socket.on("response", (data) => setMessages([...messages, ...data]));
  }, []);

  useEffect(() => {
    socket.on("responseTyping", (data) => {
      setTyper(data);
      setTimeout(() => setTyper({}), 1000);
    });
  }, [socket]);

  return (
    <div className="chat-page">
      <Sidebar socket={socket} />
      <main className="main">
        <Header socket={socket} />
        <Body messages={messages} typer={typer} />
        <MessageBlock socket={socket} />
      </main>
    </div>
  );
};

export default ChatPage;
