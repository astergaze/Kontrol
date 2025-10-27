import React from "react";
import { useNavigate } from "react-router-dom";
import "./css/changePwd.css";
import Header from "./Header";

const ChangePassword = () => {
  const navigate = useNavigate();

  const Return = () => {
    navigate("/main");
  };
  const handleChangePwd = ()=>{
    navigate("/main")
  }

  return (
    <>
      <Header />
      <div className="ChangePwdMC"> 
        <button className="return" onClick={Return}>
          Volver
        </button>
        
        <div className="changePwdForm"> 
          <h2>Cambio de contraseña</h2> 

          <p>DNI</p>
          <input
            type="text"
            name="DNI"
            id="DNIForm"
            placeholder="Ej: 012345678"
            className="changePwdInput"
            maxLength={8}
            pattern="[0-9]{8}"
          />

          <p>Contraseña actual</p>
          <input
            type="password"
            name="CurrentPassword"
            id="currentPasswordForm"
            placeholder="************"
            className="changePwdInput"
          />

          <p>Nueva Contraseña</p>
          <input
            type="password"
            name="NewPassword"
            id="newPasswordForm"
            placeholder="************"
            className="changePwdInput"
          />

          <p>Confirme Contraseña</p>
          <input
            type="password"
            name="ConfirmPassword"
            id="confirmPasswordForm"
            placeholder="************"
            className="changePwdInput"
          />

          <button className="changePwdBtn" onClick={handleChangePwd}>Cambiar contraseña</button>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;