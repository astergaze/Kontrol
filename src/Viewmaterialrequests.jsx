import React from "react";
import { useNavigate } from "react-router-dom";
import "./css/Viewmaterialrequests.css";
import Header from "./Header";

const MaterialRequest = () => {
  const navigate = useNavigate();

  const Return = () => {
    navigate("/main");
  };
  return (
    <>
      <Header />
      <div className="matMainCont">
        <button className="return" onClick={Return}>
          Volver
        </button>
        <div className="requestCard">
          <div className="material">Material: </div>
          <div className="jobOrder">Nro de orden: </div>
        </div>
      </div>
    </>
  );
};

export default MaterialRequest;
