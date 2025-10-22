import React, { useState, useEffect, useRef } from "react";
import "./css/Header.css";
import UserOptionsMenu from "./subcomponents/UserOptionsMenu";
import { useNavigate } from "react-router-dom";
import NotificationMenu from "./subcomponents/NotificationMenu";

const Header = () => {
  const navigate = useNavigate();
  const [isNotifMenuOpen, setIsNotifMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Referencias para cada menu
  const notifMenuRef = useRef(null);
  const userMenuRef = useRef(null);

  const handleChat = () => {
    navigate("/chat");
  };

  const toggleNotifMenu = () => {
    setIsNotifMenuOpen(!isNotifMenuOpen);
    setIsUserMenuOpen(false); 
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
    setIsNotifMenuOpen(false); 
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Cierra el menu de usuario si el clic es fuera de su ref
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
      // Cierra el menu de notificaciones si el clic es fuera de su ref
      if (notifMenuRef.current && !notifMenuRef.current.contains(event.target)) {
        setIsNotifMenuOpen(false);
      }
    };

    if (isUserMenuOpen || isNotifMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isUserMenuOpen, isNotifMenuOpen]); 

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

        
            <div className="notif-container" ref={notifMenuRef}>
              <span className="bell" onClick={toggleNotifMenu} style={{ cursor: "pointer" }}>
                <img src="https://i.imgur.com/S4nFOIE.png" alt="logo campana" />
              </span>
              {isNotifMenuOpen && <NotificationMenu />}
            </div>
          </div>

          <div className="perfil-container" ref={userMenuRef}>
            <div
              className="perfil"
              onClick={toggleUserMenu}
              style={{ cursor: "pointer" }}
            >
              <span className="icono-user">
                <img src="https://i.imgur.com/ZBIlQwo.png" alt="logo usuario" />
              </span>
              <div>
                <p>UsuarioEjemplo</p>
                <small>Administrador</small>
              </div>
            </div>
            {isUserMenuOpen && <UserOptionsMenu />}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;