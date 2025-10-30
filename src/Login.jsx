import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "./css/login.css";

const Login = () => {
  const navigate = useNavigate();
  const [DNI, setDNI] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const payload = jwtDecode(token);
        if (payload.isAdmin) {
          navigate("/main");
        } else {
          navigate("/mainU");
        }
      }
    } catch (e) {
      // Si token invalido, borrado
      console.error("Token inválido o expirado:", e);
      localStorage.removeItem("token");
    }
  }, [navigate]); 

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.post("http://localhost:3001/api/login", {
        DNI,
        password,
      });
      const token = res.data.token;
      
      if (!token) {
        return alert("DNI o contraseña incorrectos.");
      }
      localStorage.setItem("token", token);
      const payload = jwtDecode(token);
      if (payload.isAdmin) {
        navigate("/main");
      } else {
        navigate("/mainU");
      }

    } catch (err) {
      console.error("Error al iniciar sesión:", err.response?.data?.message || err.message);
      alert("DNI o contraseña incorrectos.");
    }
  };

  return (
    <div className="mainCont">
      <form className="loginForm" onSubmit={handleLogin}>
        <h2>Iniciar Sesión</h2>
        <p>Ingrese su DNI</p>
        <input
          type="text"
          name="DNI"
          className="loginInput"
          maxLength={8}
          pattern="[0-9]{8}"
          value={DNI}
          onChange={(e) => setDNI(e.target.value)} 
          required 
        />
        <p>Ingrese su contraseña</p>
        <input
          type="password"
          name="Password"
          className="loginInput"
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required
        />
        <button className="loginBtn" type="submit">
          Ingresar
        </button>
      </form>
    </div>
  );
};

export default Login;