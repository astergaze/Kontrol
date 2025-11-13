import React, { useState, useEffect, useRef } from "react";
import "./css/Header.css";
import UserOptionsMenu from "./subcomponents/UserOptionsMenu";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Header = () => {
  const navigate = useNavigate();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const userMenuRef = useRef(null);

  const handleChat = () => {
    navigate("/chat");
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserData(decoded);
      } catch (e) {
        console.log("Invalido o expiro");
        localStorage.removeItem("token");
        navigate("/");
      }
    } else {
      navigate("/");
    }
    const handleClickOutside = (event) => {
      // Cierra el menu de usuario si el clic es fuera de su ref
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    if (isUserMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isUserMenuOpen, navigate]);
  if (!userData) {
    return (
      <div className="mainPageheader">
        <header> Cargando </header>{" "}
      </div>
    );
  }
  return (
    <div className="mainPageheader">
      {" "}
      <header>
        {" "}
        <div className="logo">
          {" "}
          <img src="https://i.imgur.com/2ToRgc7.png" alt="Logo Kingdom" />{" "}
        </div>{" "}
        <div className="usuario">
          {" "}
          <div className="iconos-superior">
            {" "}
            <span className="chat">
              {" "}
              <img
                src="https://i.imgur.com/mwR5HzO.png"
                alt="logo chat"
                onClick={handleChat}
              />{" "}
            </span>{" "}
          </div>{" "}
          <div className="perfil-container" ref={userMenuRef}>
            {" "}
            <div
              className="perfil"
              onClick={toggleUserMenu}
              style={{ cursor: "pointer" }}
            >
              {" "}
              <span className="icono-user">
                {" "}
                <img
                  src="https://i.imgur.com/ZBIlQwo.png"
                  alt="logo usuario"
                />{" "}
              </span>{" "}
              <div>
                {" "}
                <p>
                  {userData.nombre} {userData.apellido}
                </p>
                <small>{userData.role}</small>{" "}
              </div>{" "}
            </div>
            {isUserMenuOpen && <UserOptionsMenu />}{" "}
          </div>{" "}
        </div>{" "}
      </header>{" "}
    </div>
  );
};

export default Header;
