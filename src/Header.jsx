import React, { useState } from "react";
import "./css/Header.css";
import UserOptionsMenu from "./subcomponents/UserOptionsMenu"; 
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleChat = () => {
    navigate("/chat");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="mainPageheader">
      <header>
        <div className="logo">
          <img src="https://i.imgur.com/2ToRgc7.png" alt="Logo Kingdom" />
        </div>
        <div className="usuario">
          <div className="iconos-superior">
            <span className="chat">
              <img
                src="https://i.imgur.com/mwR5HzO.png"
                alt="logo chat"
                onClick={handleChat}
              />
            </span>
            <span className="bell">
              <img src="https://i.imgur.com/S4nFOIE.png" alt="logo campana" />
            </span>
          </div>
          <div className="perfil" onClick={toggleMenu} style={{ cursor: "pointer" }}>
            <span className="icono-user">
              <img src="https://i.imgur.com/ZBIlQwo.png" alt="logo usuario" />
            </span>
            <div>
              <p>UsuarioEjemplo</p>
              <small>Administrador</small>
            </div>
          </div>
          
          {isMenuOpen && <UserOptionsMenu />} 
        </div>
      </header>
    </div>
  );
};

export default Header;