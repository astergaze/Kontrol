import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./css/Viewmaterialrequests.css";
import Header from "./Header";

const API_URL = "http://localhost:3001/api";

const MaterialRequest = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);

  const Return = () => {
    navigate("/main");
  };

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(`${API_URL}/viewmaterialrequest`);
        setRequests(response.data);
      } catch (err) {
        console.error("Error al traer los datos con axios:", err);
      }
    };

    fetchRequests();
  }, []);

  const handleAccept = async (id) => {
    try {
      await axios.post(`${API_URL}/Acept_MaterialRequest`, {
        id: id,
        newestado: "Aprobada",
      });

      setRequests((currentRequests) =>
        currentRequests.filter((req) => req.id !== id)
      );
    } catch (err) {
      console.error("Error al aceptar la solicitud:", err);
    }
  };

  const handleDecline = async (id) => {
    try {
      await axios.post(`${API_URL}/Acept_MaterialRequest`, {
        id: id, 
        newestado: "Rechazada",
      });

      setRequests((currentRequests) =>
        currentRequests.filter((req) => req.id !== id)
      );
    } catch (err) {
      console.error("Error al rechazar la solicitud:", err);
    }
  };

  return (
    <>
      <Header />
      <div className="matMainCont">
        <button className="return" onClick={Return}>
          Volver
        </button>
        {requests.map((request) => (
          <div className="requestCard" key={request.id}>
            {" "}
            <div className="material">Material: {request.material}</div>
            <div className="jobOrder">
              Orden de trabajo: {request.ordenTrabajoId || "N/A"}
            </div>
            {request.estado === "Pendiente" && (
              <>
                <button
                  className="Acept"
                  onClick={() => handleAccept(request.id)}
                >
                  ✔
                </button>
                <button
                  className="Decline"
                  onClick={() => handleDecline(request.id)}
                >
                  X
                </button>
              </>
            )}
          </div>
        ))}

        {requests.length === 0 && (
          <div style={{ color: "white", textAlign: "center", padding: "20px" }}>
            No hay solicitudes pendientes.
          </div>
        )}
      </div>
    </>
  );
};

export default MaterialRequest;
