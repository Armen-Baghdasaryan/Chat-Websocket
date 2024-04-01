import { useEffect, useState } from "react";

const Sidebar = ({ socket }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on("joined", (data) => setUsers([...users, ...data]));
  }, []);

  const filteredList = users.filter(
    (value, index, self) =>
      index ===
      self.findIndex(
        (t) => t.name === value.name && t.socketID === value.socketID
      )
  );

  return (
    <div className="sidebar">
      <h2>Users</h2>
      <ul>
        {filteredList?.map((elem) => (
          <li key={elem.id}>{elem.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
