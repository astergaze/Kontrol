import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./css/login.css";

const Login = () => {
  const navigate = useNavigate();
  const handleLogin = async () => {
    const DNI = document.getElementById("DNIForm").value
    const password = document.getElementById("passwordForm").value
    const res = await axios.post("http://localhost:3001/api/login", {
      DNI,
      password
    })
    console.log(res.data.message);
    if(res.data.message === "Inicio de sesion exitoso") {
      navigate("/main");
    }
  };

  return (
    <div className="mainCont">
      <div className="loginForm">
        <h2>Iniciar Sesión</h2>
        <p>Ingrese su DNI</p>
        <input
          type="text"
          name="DNI"
          id="DNIForm"
          className="loginInput"
          maxLength={8}
          pattern="[0-9]{8}"
        />
        <p>Ingrese su contraseña</p>
        <input
          type="password"
          name="Password"
          id="passwordForm"
          className="loginInput"
        />
        <button className="loginBtn" onClick={handleLogin}>
          Ingresar
        </button>
      </div>
    </div>
  );
};

export default Login;
