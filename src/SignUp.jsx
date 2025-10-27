import React from "react";
import { useNavigate } from "react-router-dom";
import "./css/signup.css";
import Header from "./Header";
import axios from "axios";


const SignUp = () => {
  const navigate = useNavigate();

  const Return = () => {
    navigate("/main");
  };  

  const SignEmployee = async () => {
    const name = document.getElementById("nameForm").value;
    const lastname = document.getElementById("lastnameForm").value;
    const email = document.getElementById("emailForm").value;
    const phone = document.getElementById("phonenumberForm").value;
    const DNI = document.getElementById("DNIForm").value;
    const response = await axios.post("http://localhost:3001/api/signup", {
      nombre: name,
      apellido: lastname,
      email: email,
      telefono: phone,
      DNI: DNI,
    });
    console.log(response.data);
  }

  return (
    <>
      <Header />
      <div className="SignUpMC">
        <button className="return" onClick={Return}>
          Volver
        </button>
        <div className="signupForm">
          <h2>Alta operador</h2>
          <p>Nombre</p>
          <input
            type="text"
            name="Name"
            id="nameForm"
            placeholder="Ejemplo: Jose Maria"
            className="signupInput"
          />
          <p>Apellido</p>
          <input
            type="text"
            name="LastName"
            id="lastnameForm"
            placeholder="Ejemplo: Bodoque Santos"
            className="signupInput"
          />
          <p>Correo Electronico</p>
          <input
            type="email"
            name="Email"
            id="emailForm"
            placeholder="Ejemplo: ejemplo@gmail.com"
            className="signupInput"
          />
          <p>Numero de celular</p>
          <input
            type="text"
            name="PhoneNumber"
            id="phonenumberForm"
            placeholder="Ejemplo: 11 1234-5678"
            className="signupInput"
            maxLength={10}
            pattern="[0-9]{10}"
          />
          <p>DNI</p>
          <input
            type="text"
            name="DNI"
            id="DNIForm"
            placeholder="Ejemplo: 12345678"
            className="signupInput"
            maxLength={8}
            pattern="[0-9]{8}"
          />
          <button className="signupBtn" onClick={SignEmployee}>Dar Alta</button>
        </div>
      </div>
    </>
  );
};

export default SignUp;
