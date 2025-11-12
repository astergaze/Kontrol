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
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Error de autenticación. Por favor, vuelva a iniciar sesión.");
          navigate("/");
          return;
        }
        const headers = {
          Authorization: token,
        };

        const response = await axios.get(`${API_URL}/viewmaterialrequest`, {
          headers: headers,
        });
        setRequests(response.data);
      } catch (err) {
        console.error("Error al traer los datos con axios:", err);
        if (
          err.response &&
          (err.response.status === 401 || err.response.status === 403)
        ) {
          alert("Su sesión ha expirado. Por favor, inicie sesión nuevamente.");
          localStorage.removeItem("token");
          navigate("/");
        } else {
          alert("No se pudieron cargar las solicitudes de material.");
        }
      }
    };

    fetchRequests();
  }, [navigate]); 

  const handleAccept = async (id) => {
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

      await axios.post(
        `${API_URL}/Acept_MaterialRequest`,
        {
          id: id,
          newestado: "Aprobada",
        },
        { headers: headers }
      );

      setRequests((currentRequests) =>
        currentRequests.filter((req) => req.id !== id)
      );
    } catch (err) {
      console.error("Error al aceptar la solicitud:", err);
      if (
        err.response &&
        (err.response.status === 401 || err.response.status === 403)
      ) {
        alert("Su sesión ha expirado. Por favor, inicie sesión nuevamente.");
        localStorage.removeItem("token");
        navigate("/");
      } else {
        alert("Error al aceptar la solicitud.");
      }
    }
  };

  const handleDecline = async (id) => {
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

      await axios.post(
        `${API_URL}/Acept_MaterialRequest`,
        {
          id: id,
          newestado: "Rechazada",
        },
        { headers: headers }
      ); 

      setRequests((currentRequests) =>
        currentRequests.filter((req) => req.id !== id)
      );
    } catch (err) {
      console.error("Error al rechazar la solicitud:", err);
      if (
        err.response &&
        (err.response.status === 401 || err.response.status === 403)
      ) {
        alert("Su sesión ha expirado. Por favor, inicie sesión nuevamente.");
        localStorage.removeItem("token");
        navigate("/");
      } else {
        alert("Error al rechazar la solicitud.");
      }
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
