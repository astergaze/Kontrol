import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "./css/login.css";

const styles = {
  notificationBase: {
    marginBottom: "15px",
    fontWeight: "500",
    textAlign: "center",
    width: "100%",
  },
  error: {
    color: "#e04655ff", 
  },
};

const Login = () => {
  const navigate = useNavigate();
  const [DNI, setDNI] = useState("");
  const [password, setPassword] = useState("");

  const [notification, setNotification] = useState({ message: "", type: "" });

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const payload = jwtDecode(token);
        if (payload.role === "jefe") {
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
    setNotification({ message: "", type: "" });

    try {
      const res = await axios.post("http://localhost:3001/api/login", {
        DNI,
        password,
      });
      const token = res.data.token;
      
      if (!token) {
        setNotification({ 
          message: "DNI o contraseña incorrectos.", 
          type: "error" 
        });
        return;
      }

      localStorage.setItem("token", token);
      const payload = jwtDecode(token);
      if (payload.role === "jefe") {
        navigate("/main");
      } else {
        navigate("/mainU");
      }

    } catch (err) {
      console.error("Error al iniciar sesión:", err.response?.data?.message || err.message);
      
      const errorMsg = err.response?.data?.message || "DNI o contraseña incorrectos.";
      setNotification({ message: errorMsg, type: "error" });
    }
  };

  let notificationStyle = styles.notificationBase;
  if (notification.type === "success") {
    notificationStyle = { ...notificationStyle, ...styles.success };
  } else if (notification.type === "error") {
    notificationStyle = { ...notificationStyle, ...styles.error };
  }

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
        
        {notification.message && (
          <div style={notificationStyle}>
            {notification.message}
          </div>
        )}

        <button className="loginBtn" type="submit">
          Ingresar
        </button>
      </form>
    </div>
  );
};

export default Login;