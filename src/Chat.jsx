import React, { useState, useEffect } from "react"; 
import { useNavigate } from "react-router-dom";
import "./css/chat.css";
import Header from "./Header";
import { jwtDecode } from "jwt-decode"; 

const Chat = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null); 
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserData(decoded);
      } catch (e) {
        console.log("Token inválido o expiró");
        localStorage.removeItem("token");
        navigate("/");
      }
    } else {
      navigate("/");
    }
  }, [navigate]);
  const Return = () => {
    if (userData && userData.role === "jefe") {
      navigate("/main");
    } else {
      navigate("/mainU");
    }
  };
  if (!userData) {
    return null; 
  }

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