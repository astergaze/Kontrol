import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./css/changePwd.css"; 
import Header from "./Header";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

// Estilos de notificación (simplificados, solo texto)
const styles = {
  notificationBase: {
    marginBottom: "15px",
    fontWeight: "500",
    textAlign: "center",
    width: "100%",
  },
  success: {
    color: "#36da5cff", 
  },
  error: {
    color: "#e04655ff", 
  },
};

const ChangePassword = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [oldPwd, setOldPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  
  const [notification, setNotification] = useState({ message: "", type: "" });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserData(decoded);
      } catch (e) {
        console.log("Token invalido o expiro");
        localStorage.removeItem("token");
        setNotification({ 
          message: "Su sesión es inválida o ha expirado. No podrá cambiar su contraseña.", 
          type: "error" 
        });
      }
    } else {
      setNotification({ 
        message: "No se encontró sesión de usuario. No podrá cambiar su contraseña.", 
        type: "error" 
      });
    }
  }, []); 

  const Return = () => {
    if (userData && userData.role === "jefe") {
      navigate("/main");
    } else {
      navigate("/mainU");
    }
  };

  const handleChangePwd = async (event) => {
    event.preventDefault();
    setNotification({ message: "", type: "" });

    if (!userData) {
      setNotification({
        message: "Error: No se pudo verificar la identidad del usuario. Inicie sesión de nuevo.",
        type: "error",
      });
      return;
    }
    
    if (!oldPwd || !newPwd) {
      setNotification({
        message: "Por favor, complete todos los campos.",
        type: "error",
      });
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setNotification({
          message: "Error de autenticación. No se encontró token.",
          type: "error",
        });
        return;
      }

      const headers = {
        Authorization: token,
      };

      const res = await axios.post(
        "http://localhost:3001/api/changePwd",
        {
          oldPwd: oldPwd,
          newPwd: newPwd,
          DNI: userData.DNI,
        },
        {
          headers: headers,
        }
      );

      if (res.data.message === "Contraseña cambiada correctamente") {
        setNotification({
          message: "Actualización completa. Redirigiendo...",
          type: "success",
        });
        setTimeout(() => {
          if (userData.role === "jefe") {
            navigate("/main");
          } else {
            navigate("/mainU");
          }
        }, 2000);
      }
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Error al cambiar la contraseña.";
      console.error(errorMsg);
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
    <>
      <Header />{" "}
      <div className="ChangePwdMC">
        {" "}
        <button className="return" onClick={Return}>
          Volver{" "}
        </button>{" "}
        <form className="changePwdForm" onSubmit={handleChangePwd}>
          <h2>Cambio de contraseña</h2> <p>Contraseña actual</p>{" "}
          <input
            type="password"
            name="CurrentPassword"
            value={oldPwd}
            onChange={(e) => setOldPwd(e.target.value)}
            placeholder="************"
            className="changePwdInput"
            required
          />
          <p>Nueva Contraseña</p>{" "}
          <input
            type= "password"
            name= "NewPassword"
            value={newPwd}
            onChange={(e) => setNewPwd(e.target.value)}
            placeholder="************"
            className="changePwdInput"
            required
          />
          
          {notification.message && (
            <div style={notificationStyle}>
              {notification.message}
            </div>
          )}
          
          <button className="changePwdBtn" type="submit">
            Cambiar contraseña{" "}
          </button>{" "}
        </form>{" "}
      </div>{" "}
    </>
  );
};

export default ChangePassword;