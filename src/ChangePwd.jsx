import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./css/changePwd.css";
import Header from "./Header";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [oldPwd, setOldPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [error, setError] = useState(null);

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
  }, [navigate]);

  const Return = () => {
    if (userData && userData.role === "jefe") {
      navigate("/main");
    } else {
      navigate("/mainU");
    }
  };

  const handleChangePwd = async (event) => {
    event.preventDefault();
    setError(null);

    if (!userData || !oldPwd || !newPwd) {
      setError("Por favor, complete todos los campos.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3001/api/changePwd", {
        oldPwd: oldPwd,
        newPwd: newPwd,
        DNI: userData.DNI,
      });
      if (res.data.message === "Contraseña cambiada correctamente") {
        alert("Actualización completa");
        
        if (userData.role === "jefe") {
          navigate("/main");
        } else {
          navigate("/mainU");
        }
      }
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Error al cambiar la contraseña.";
      console.error(errorMsg);
      setError(errorMsg);
    }
  };

  return (
    <>
      <Header />
      <div className="ChangePwdMC">
        <button className="return" onClick={Return}>
          Volver
        </button>
        <form className="changePwdForm" onSubmit={handleChangePwd}>
          <h2>Cambio de contraseña</h2>

          <p>Contraseña actual</p>
          <input
            type="password"
            name="CurrentPassword"
            value={oldPwd}
            onChange={(e) => setOldPwd(e.target.value)}
            placeholder="************"
            className="changePwdInput"
            required
          />

          <p>Nueva Contraseña</p>
          <input
            type="password"
            name="NewPassword"
            value={newPwd}
            onChange={(e) => setNewPwd(e.target.value)}
            placeholder="************"
            className="changePwdInput"
            required
          />
          {error && <p className="errorText">{error}</p>}

          <button className="changePwdBtn" type="submit">
            Cambiar contraseña
          </button>
        </form>
      </div>
    </>
  );
};

export default ChangePassword;