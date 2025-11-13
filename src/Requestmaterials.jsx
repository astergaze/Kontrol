import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import "./css/RequestMaterials.css"; 

const RequestMaterials = () => {
  const navigate = useNavigate();
  const [material, setMaterial] = useState("");
  const [order, setOrder] = useState("");

  const Return = () => {
    navigate("/mainU");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ material, order });
    // acá podrías enviar la solicitud con axios
  };

  return (
    <>
      <Header />
      <div className="ChangePwdMC">
        <button className="return" onClick={Return}>
          Volver
        </button>

        <form className="changePwdForm" onSubmit={handleSubmit}>
          <h2>Solicitud de material</h2>

          <p>Material</p>
          <input
            className="changePwdInput"
            type="text"
            placeholder="Ej: Papel, plancha metálica, etc"
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
          />

          <p>Orden de trabajo</p>
          <input
            className="changePwdInput"
            type="text"
            placeholder="Ej: 1"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
          />

          <button type="submit" className="changePwdBtn">
            Solicitar
          </button>
        </form>
      </div>
    </>
  );
};

export default RequestMaterials;
