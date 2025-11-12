import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Profile.css";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Header from "./Header";

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [savedEmail, setSavedEmail] = useState("");
  const [savedPhone, setSavedPhone] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});

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

  useEffect(() => {
    if (userData) {
      const emailFromToken = userData.email || "";
      const phoneFromToken = userData.telefono || "";

      setSavedEmail(emailFromToken);
      setUserEmail(emailFromToken);
      setSavedPhone(phoneFromToken);
      setUserPhone(phoneFromToken);
    }
  }, [userData]);

  const Return = () => {
    if (userData.role === "jefe") {
      navigate("/main");
    } else {
      navigate("/mainU");
    }
  };

  const handleModify = () => {
    setUserEmail(savedEmail);
    setUserPhone(savedPhone);
    setErrors({});
    setIsEditing(true);
  };

  const validate = () => {
    let formErrors = {};
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!userEmail || !emailRegex.test(userEmail)) {
      formErrors.userEmail = "El correo electrónico no es válido.";
      isValid = false;
    }
    const phoneClean = userPhone.replace(/[\s-]/g, "");
    if (!userPhone || phoneClean.length < 10 || !/^\d+$/.test(phoneClean)) {
      formErrors.userPhone = "El celular debe contener al menos 10 dígitos.";
      isValid = false;
    }
    setErrors(formErrors);
    return isValid;
  };

  const handleSave = async () => {
    if (validate()) {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Error de autenticación. Por favor, vuelva a iniciar sesión.");
          navigate("/");
          return;
        }

        const headers = {
          Authorization: token,
        };

        const res = await axios.post(
          "http://localhost:3001/api/modify",
          {
            phone: userPhone,
            email: userEmail,
            DNI: userData.DNI,
          },
          {
            headers: headers,
          }
        );

        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
          try {
            const decoded = jwtDecode(res.data.token);
            setUserData(decoded);
          } catch (e) {
            console.error("Error al decodificar el nuevo token:", e);
          }
        } //console.log("Guardando cambios:", res.data);
        setSavedEmail(userEmail);
        setSavedPhone(userPhone);
        setIsEditing(false);
      } catch (error) {
        console.error("Error al guardar:", error);
        const errorMessage =
          error.response?.data?.message ||
          "No se pudo guardar la información. Intente más tarde.";
        alert(errorMessage);
        setErrors({
          api: "No se pudo guardar la informacion. Intente mas tarde.",
        });
      }
    } else {
      console.log("Error de validacion, no se guarda.");
    }
  };

  const handleCancel = () => {
    setUserEmail(savedEmail);
    setUserPhone(savedPhone);
    setErrors({});
    setIsEditing(false);
  };

  if (!userData) {
    return (
      <>
        <Header />{" "}
        <div className="generalContent">
          <p>Cargando</p>{" "}
        </div>{" "}
      </>
    );
  }

  return (
    <>
      <Header />{" "}
      <div className="generalContent">
        {" "}
        <button className="returnf" onClick={Return}>
          Volver{" "}
        </button>{" "}
        <div className="ProfileContainer">
          {" "}
          <img
            src="https://i.imgur.com/PTl7Fsg.png"
            alt="Profile Image"
            className="profileLogo"
          />{" "}
          <div className="profileData">
            {" "}
            <div>
              <strong>Nombre:</strong> {userData.nombre}{" "}
            </div>{" "}
            <div>
              <strong>Apellido:</strong> {userData.apellido}{" "}
            </div>{" "}
            <div className={`data-row ${errors.userEmail ? "has-error" : ""}`}>
              <strong>Correo:</strong>{" "}
              {isEditing ? (
                <>
                  {" "}
                  <input
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="editInput"
                  />{" "}
                  {errors.userEmail && (
                    <p className="errorText">{errors.userEmail}</p>
                  )}{" "}
                </>
              ) : (
                savedEmail
              )}{" "}
            </div>{" "}
            <div className={`data-row ${errors.userPhone ? "has-error" : ""}`}>
              <strong>Celular:</strong>{" "}
              {isEditing ? (
                <>
                  {" "}
                  <input
                    type="tel"
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    className="editInput"
                  />{" "}
                  {errors.userPhone && (
                    <p className="errorText">{errors.userPhone}</p>
                  )}{" "}
                </>
              ) : (
                savedPhone
              )}{" "}
            </div>{" "}
            <div>
              <strong>DNI:</strong> {userData.DNI}{" "}
            </div>{" "}
            <div>
              <strong>Fecha de alta:</strong> {userData.fechaAlta || "N/A"}{" "}
            </div>{" "}
            {errors.api && <p className="errorText">{errors.api}</p>}{" "}
            {isEditing ? (
              <>
                {" "}
                <button className="save" onClick={handleSave}>
                  Guardar Cambios{" "}
                </button>{" "}
                <button className="cancel" onClick={handleCancel}>
                  Cancelar{" "}
                </button>{" "}
              </>
            ) : (
              <button className="modify" onClick={handleModify}>
                Modificar{" "}
              </button>
            )}{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </>
  );
};

export default Profile;
