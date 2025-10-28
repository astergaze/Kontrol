import React from "react";
import { useNavigate } from "react-router-dom";
import "./css/Profile.css";
import Header from "./Header";
const Profile = () => {
    const navigate = useNavigate();

    const Return = () => {
        navigate("/mainU");
    };

    return (
        <>
            <Header />
            <div className="generalContent">
             <button className="returnf" onClick={Return}>
                 Volver
             </button>
                <div className="ProfileContainer">
                  <img src="https://i.imgur.com/PTl7Fsg.png" alt="Profile Image" className="profileLogo"/>
                    <div className="profileData">
                        <div><strong>Nombre:</strong> Jose Maria</div>
                        <div><strong>Apellido:</strong> Bodoque Santos</div>
                        <div><strong>Correo:</strong> ejemplo@gmail.com</div>
                        <div><strong>Celular:</strong> 11-1234-5678</div>
                        <div><strong>DNI:</strong> 12345678</div>
                        <div><strong>Fecha de alta:</strong> 27/10/2025</div>
                        <button className="modify">Modificar</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
