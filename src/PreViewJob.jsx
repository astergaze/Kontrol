import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./css/PreViewJob.css";
import Header from "./Header";
import axios from "axios"; // Asegúrate que esté importado

const PreViewJob = () => {
  const navigate = useNavigate();
  const [trabajos, setTrabajos] = useState([]);

  // Cargar los trabajos al montar el componente
  useEffect(() => {
    // LOG 1: Ver si el efecto se dispara
    console.log("DEBUG (PreViewJob): 1. useEffect se está ejecutando.");

    const fetchTrabajos = async () => {
      const token = localStorage.getItem("token");
      
      // LOG 2: Verificar el token
      console.log("DEBUG (PreViewJob): 2. Token obtenido:", token);

      if (!token) {
        console.error("DEBUG (PreViewJob): No hay token, redirigiendo.");
        navigate("/");
        return;
      }

      try {
        // LOG 3: Confirmar que entramos al try
        console.log("DEBUG (PreViewJob): 3. Entrando al TRY block...");
        
        const response = await axios.get(
          "http://localhost:3001/api/ot/lista", // La URL que consultamos
          {
            headers: {
              Authorization: token,
            },
          }
        );

        // LOG 4: ÉXITO - Ver qué datos llegaron
        console.log("DEBUG (PreViewJob): 4. ÉXITO. Datos recibidos:", response.data);
        setTrabajos(response.data);

      } catch (error) {
        // LOG 5: FRACASO - Ver el error
        console.error("DEBUG (PreViewJob): 5. ERROR EN EL BLOQUE CATCH:", error);
        
        if (error.response) {
          // Error devuelto por el servidor (404, 500, 401)
          console.error(
            "DEBUG (PreViewJob): Error Response Data:",
            error.response.data
          );
          console.error(
            "DEBUG (PreViewJob): Error Response Status:",
            error.response.status
          );
        } else if (error.request) {
          // Error de red (servidor apagado, CORS)
           console.error("DEBUG (PreViewJob): Error Request:", error.request);
        } else {
          // Otro error
           console.error("DEBUG (PreViewJob): Error Message:", error.message);
        }
        
        if (error.response && error.response.status === 401) navigate("/");
        else alert("Error al cargar la lista de trabajos (revisa la consola)");
      }
    };

    fetchTrabajos();
  }, [navigate]);

  // Navegación dinámica al hacer clic
  const tp = (id) => {
    navigate(`/ViewJob/${id}`);
  };

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

        {/* Mapeo dinámico de las tarjetas de trabajo */}
        {trabajos.length > 0 ? (
          trabajos.map((trabajo) => (
            <div
              key={trabajo.id}
              className="requestCard"
              onClick={() => tp(trabajo.id)}
              style={{ cursor: "pointer" }}
            >
              <div className="orderNumber">O/T N°: {trabajo.id}</div>
              <div className="expiration">
                Ven:{" "}
                {trabajo.fechaFin
                  ? new Date(trabajo.fechaFin).toLocaleDateString()
                  : "N/A"}
              </div>
              <div className="state">Estado: {trabajo.estado}</div>
            </div>
          ))
        ) : (
          <p>No hay órdenes de trabajo para mostrar.</p>
        )}
      </div>
    </>
  );
};

export default PreViewJob;