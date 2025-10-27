import React from "react";
import changePwdImg from "../img/changePwd.png";
import logOutImg from "../img/logOut.png";
import { useNavigate } from "react-router-dom";
const UserOptionsMenu = () => {

  const navigate = useNavigate();
  const handleLogOut = () => {
    navigate("/");
  };
  const handleChangePwd = () => {
    navigate("/ChangePwd");
  };

  return (
    <>
        <div className="menu">
            <div onClick={handleChangePwd}><p>Cambiar contraseña</p> <img src={changePwdImg} alt="" /></div>
            <div onClick={handleLogOut}><p>Cerrar sesión</p> <img src={logOutImg} alt="" /></div>
        </div>
    </>
  );
};

export default UserOptionsMenu;
