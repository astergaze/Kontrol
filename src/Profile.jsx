import React, { useState, useEffect } 
    from "react";
import { useNavigate } from "react-router-dom";
import "./css/Profile.css";
import axios from "axios";
import Header from "./Header";

const Profile = () => {
  const navigate = useNavigate();

  // cosas "guardadas", estos datos tienen que venir despues de JWT o la API
  const [savedEmail, setSavedEmail] = useState("ejemplo@gmail.com");
  const [savedPhone, setSavedPhone] = useState("11-1234-5678");
  // para editar los datos
  const [userEmail, setUserEmail] = useState(savedEmail);
  const [userPhone, setUserPhone] = useState(savedPhone);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});

  // datos test
  const fixedData = {
    nombre: "Jose Maria",
    apellido: "Bodoque Santos",
    dni: "31313131",
    fechaAlta: "27/10/2025",
  };

  const Return = () => {
    navigate("/mainU");
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
        const res = await axios.post("http://localhost:3001/api/modify", {
          phone: userPhone,
          email: userEmail,
          DNI: fixedData.dni,
        });

        console.log("Guardando cambios:", res.data);
        setSavedEmail(userEmail);
        setSavedPhone(userPhone);
        setIsEditing(false);
      } catch (error) {
        console.error("Error al guardar:", error);
        setErrors({
          api: "No se pudo guardar la información. Intente más tarde."
        });
      }
    } else {
      console.log("Error de validación, no se guarda.");
    }
  };

  const handleCancel = () => {
    // Restaura los estados de edicion
    setUserEmail(savedEmail);
    setUserPhone(savedPhone);

    setErrors({}); // Limpia errores
    setIsEditing(false);
  };

  return (
    <>
      <Header />
      <div className="generalContent">
        <button className="returnf" onClick={Return}>
          Volver
        </button>
        <div className="ProfileContainer">
          <img
            src="https://i.imgur.com/PTl7Fsg.png"
            alt="Profile Image"
            className="profileLogo"
          />
          <div className="profileData">
            <div>
              <strong>Nombre:</strong> {fixedData.nombre}
            </div>
            <div>
              <strong>Apellido:</strong> {fixedData.apellido}
            </div>

            <div className={`data-row ${errors.userEmail ? "has-error" : ""}`}>
              <strong>Correo:</strong>
              {isEditing ? (
                <>
                  <input
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="editInput"
                  />
                  {errors.userEmail && (
                    <p className="errorText">{errors.userEmail}</p>
                  )}
                </>
              ) : (
                savedEmail
              )}
            </div>

            <div className={`data-row ${errors.userPhone ? "has-error" : ""}`}>
              <strong>Celular:</strong>
              {isEditing ? (
                <>
                  <input
                    type="tel"
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    className="editInput"
                  />
                  {errors.userPhone && (
                    <p className="errorText">{errors.userPhone}</p>
                  )}
                </>
              ) : (
                savedPhone 
              )}
            </div>

            <div>
              <strong>DNI:</strong> {fixedData.dni}
            </div>
            <div>
              <strong>Fecha de alta:</strong> {fixedData.fechaAlta}
            </div>
            
            {/* Mensaje de error de la API */}
            {errors.api && <p className="errorText">{errors.api}</p>}

            {isEditing ? (
              <>
                <button className="save" onClick={handleSave}>
                  Guardar Cambios
                </button>
                <button className="cancel" onClick={handleCancel}>
                  Cancelar
                </button>
              </>
            ) : (
              <button className="modify" onClick={handleModify}>
                Modificar
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;