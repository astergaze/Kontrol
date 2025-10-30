import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/signup.css";
import Header from "./Header";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [DNI, setDNI] = useState("");

  const Return = () => {
    navigate("/main");
  };

  const handleSignEmployee = async (event) => {
    event.preventDefault(); 

    try {
      const response = await axios.post("http://localhost:3001/api/signup", {
        nombre: name,
        apellido: lastname,
        email: email,
        telefono: phone,
        DNI: DNI,
      });
      
    } catch (err) {
      console.error("Error al registrar empleado:", err.response?.data?.message || err.message);
    }
  };

  return (
    <>
      <Header />
      <div className="SignUpMC">
        <button className="return" onClick={Return}>
          Volver
        </button>

        <form className="signupForm" onSubmit={handleSignEmployee}>
          <h2>Alta operador</h2>

          <p>Nombre</p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ejemplo: Jose Maria"
            className="signupInput"
            required
          />

          <p>Apellido</p>
          <input
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            placeholder="Ejemplo: Bodoque Santos"
            className="signupInput"
            required
          />

          <p>Correo Electronico</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ejemplo: ejemplo@gmail.com"
            className="signupInput"
            required
          />

          <p>Numero de celular</p>
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

          <p>DNI</p>
          <input
            type="text"
            value={DNI}
            onChange={(e) => setDNI(e.target.value)}
            placeholder="Ejemplo: 12345678"
            className="signupInput"
            maxLength={8}
            pattern="[0-9]{8}"
            required
          />

          <button className="signupBtn" type="submit">
            Dar Alta
          </button>
        </form>
      </div>
    </>
  );
};

export default SignUp;