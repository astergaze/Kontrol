import React from "react";
import { useNavigate } from "react-router-dom";
import "./css/chat.css";
import Header from "./Header";
const Chat = () => {
  const navigate = useNavigate();

  const Return = () => {
    navigate("/main");
  };

  return (
    <>
      <Header />
      <div className="chatMainCont">
        <button className="return" onClick={Return}>
          Volver
        </button>
        <div className="chatCont">
          <div className="users"></div>

          <div className="chatInputArea">
            <img
              src="https://i.imgur.com/fYLdolN.png"
              alt="Agregar archivo"
              id="addFile"
            />
            <input
              type="text"
              name="chatInput"
              id="chatBar"
              placeholder="Write here"
            />
            <img
              src="https://i.imgur.com/442CuF9.png"
              alt="Enviar"
              id="sendMessage"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
