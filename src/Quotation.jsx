import React from "react";
import { useNavigate } from "react-router-dom";
import "./css/PreViewJob.css";
import Header from "./Header";

const Quotation = () => {
  const navigate = useNavigate();
  const handleGen = () => {
    navigate("/QuotePDF")
  }
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
        <div className="requestCard" onClick={handleGen} style={{cursor:"pointer"}}>
          <div className="orderNumber">O/T N°: </div>
          <div className="expiration">Ven: </div>
          <div className="state">Estado </div>
        </div>
      </div>
    </>
  );
};

export default Quotation;