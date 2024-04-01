import { USER_NAME } from "/src/common/constants.js";

const Body = ({ messages, typer }) => {
  const curentUserName = localStorage.getItem(USER_NAME);

  return (
    <div className="body">
      {messages.map((elem) => {
        const isMyMesage = elem.name === curentUserName;

        return (
          <div
            key={elem.id}
            className={`msg-sender ${!isMyMesage ? "other-sender" : null}`}
          >
            <p>{isMyMesage ? "You" : elem.name}</p>
            <div className="msg-text">{elem.text}</div>
          </div>
        );
      })}
      {typer.name && <p className="user-typing">{typer.name} is typing...</p>}
    </div>
  );
};

export default Body;
