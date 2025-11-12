import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/signup.css";
import Header from "./Header";
import axios from "axios";

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

const SignUp = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [DNI, setDNI] = useState("");

  const [notification, setNotification] = useState({ message: "", type: "" });

  const Return = () => {
    navigate("/main");
  };

  const handleSignEmployee = async (event) => {
    event.preventDefault();
    setNotification({ message: "", type: "" });

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setNotification({
          message: "Error de autenticación. Por favor, vuelva a iniciar sesión.",
          type: "error",
        });
        setTimeout(() => navigate("/"), 2000);
        return;
      }

      const headers = {
        Authorization: token,
      };

      const response = await axios.post(
        "http://localhost:3001/api/signup",
        {
          nombre: name,
          apellido: lastname,
          email: email,
          telefono: phone,
          DNI: DNI,
        },
        {
          headers: headers,
        }
      );

      setNotification({
        message: "Usuario creado con éxito.",
        type: "success",
      });

      setName("");
      setLastname("");
      setEmail("");
      setPhone("");
      setDNI("");

    } catch (err) {
      console.error(
        "Error al registrar empleado:",
        err.response?.data?.message || err.message
      );

      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        setNotification({
          message: "Su sesión ha expirado. Será redirigido al inicio.",
          type: "error",
        });
        localStorage.removeItem("token");
        setTimeout(() => navigate("/"), 2500);
      } else {
        const errorMessage =
          err.response?.data?.message ||
          "Error al crear el usuario. Verifique los datos.";
        
        setNotification({ message: errorMessage, type: "error" });
      }
    }
  };

  //  fusionar los estilos
  let notificationStyle = styles.notificationBase;
  if (notification.type === "success") {
    notificationStyle = { ...notificationStyle, ...styles.success };
  } else if (notification.type === "error") {
    notificationStyle = { ...notificationStyle, ...styles.error };
  }

  return (
    <>
      <Header />{" "}
      <div className="SignUpMC">
        {" "}
        <button className="return" onClick={Return}>
          Volver{" "}
        </button>{" "}
        <form className="signupForm" onSubmit={handleSignEmployee}>
          <h2>Alta operador</h2> <p>Nombre</p>{" "}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ejemplo: Jose Maria"
            className="signupInput"
            required
          />
          <p>Apellido</p>{" "}
          <input
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            placeholder="Ejemplo: Bodoque Santos"
            className="signupInput"
            required
          />
          <p>Correo Electronico</p>{" "}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ejemplo: ejemplo@gmail.com"
            className="signupInput"
            required
          />
          <p>Numero de celular</p>{" "}
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Ejemplo: 11 1234-5678"
            className="signupInput"
            maxLength={10}
            pattern="[0-9]{10}"
            required
          />
          <p>DNI</p>{" "}
          <input
            type="text"
            value={DNI}
            onChange={(e) => setDNI(e.target.value)}
            placeholder="Ejemplo: 12345678"
            className="signupInput"
            maxLength={8}
            pattern="[0-9]{8}"
            required
          />{" "}
          {notification.message && (
            <div style={notificationStyle}>
              {notification.message}
            </div>
          )}

          <button className="signupBtn" type="submit">
            Dar Alta{" "}
          </button>{" "}
        </form>{" "}
      </div>{" "}
    </>
  );
};

export default SignUp;