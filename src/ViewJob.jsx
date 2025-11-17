import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./css/ViewJob.css";
import Header from "./Header";
import { jwtDecode } from "jwt-decode";
import axios from "axios"; // Importar axios

const MainPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [userData, setUserData] = useState(null);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  // Efecto para la autenticación
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserData(decoded);
      } catch (e) {
        console.log("Token inválido o expiró");
        localStorage.removeItem("token");
        navigate("/");
      }
    } else {
      navigate("/");
    }
  }, [navigate]);

  // Efecto para cargar los datos del trabajo específico
  useEffect(() => {
    if (!id) return;
    if (!userData) return;

    const fetchJob = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `http://localhost:3001/api/ot/${id}`, // URL completa
          {
            headers: {
              Authorization: token, // <-- CORRECCIÓN: Enviar solo el token
            },
          }
        );
        setJob(response.data);
      } catch (error) {
        console.error("Error al cargar el trabajo:", error);
        if (error.response && error.response.status === 404) {
          alert("Trabajo no encontrado");
        }
        navigate("/PreViewJob");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id, navigate, userData]);

  const Return = () => {
    navigate("/PreViewJob");
  };

  const itemsParaMostrar = Array.from({ length: 10 }).map((_, i) => {
    if (job && job.DetalleOrdens && job.DetalleOrdens[i]) {
      return job.DetalleOrdens[i];
    }
    return { item: i + 1 };
  });

  if (!userData || loading) {
    return (
      <>
        <Header />
        <div className="container">Cargando...</div>
      </>
    );
  }

  if (!job) {
    return (
      <>
        <Header />
        <div className="container">
          <button className="back-button action-button" onClick={Return}>
            Volver
          </button>
          <p>No se pudieron cargar los datos del trabajo.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="job-creation container">
        <button className="back-button action-button" onClick={Return}>
          Volver
        </button>
        <section className="job-info">
          <div className="left-col">
            <div className="field-row">
              <label>Razon social/cliente:</label>
              <div className="value-display">
                {job.Cliente?.nomClien || "N/A"}
              </div>
            </div>
            <div className="field-row">
              <label>Resp:</label>
              <div className="value-display">
                {job.Cliente?.responsable || "N/A"}
              </div>
            </div>
            <div className="field-row">
              <label>Mail/Tel/Cel:</label>
              <div className="value-display">
                {job.Cliente?.contacto || "N/A"}
              </div>
            </div>
            <div className="field-row">
              <label>Dir:</label>
              <div className="value-display">
                {job.Cliente?.direccion || "N/A"}
              </div>
            </div>
          </div>
          <div className="right-col">
            <div className="field-row">
              <label>O/T Nº:</label>
              <div className="value-display">{job.id}</div>
            </div>
            <div className="field-row">
              <label>Fecha:</label>
              <div className="value-display">
                {job.fechaIn
                  ? new Date(job.fechaIn).toLocaleDateString()
                  : "N/A"}
              </div>
            </div>
            <div className="field-row">
              <label>F/Entrega:</label>
              <div className="value-display">
                {job.fechaFin
                  ? new Date(job.fechaFin).toLocaleDateString()
                  : "N/A"}
              </div>
            </div>
            <div className="field-row">
              <label>Arch:</label>
              <div className="value-display">{job.archivo || "N/A"}</div>
            </div>
          </div>
        </section>
        <section className="items-area">
          <div className="items-columns">
            {[
              { key: "item", label: "IT", class: "it", small: true },
              { key: "descripcion", label: "Descripcion", class: "description" },
              {
                key: "originales",
                label: "Originales",
                class: "originals",
                small: true,
              },
              { key: "copias", label: "Copias", class: "copies", small: true },
              { key: "papel", label: "Papel", class: "paper" },
              { key: "formato", label: "Formato", class: "format", small: true },
              { key: "colores", label: "Colores", class: "colors", small: true },
              {
                key: "terminacion",
                label: "Terminacion",
                class: "finishing",
              },
            ].map((header) => (
              <div key={header.key} className={`col ${header.class}`}>
                <div className="col-header">{header.label}:</div>
                <div className="col-rows">
                  {itemsParaMostrar.map((item, i) => (
                    <div key={i} className="row-cell">
                      <span
                        className={`cell-display ${
                          header.small ? "small" : ""
                        }`}
                      >
                        {item[header.key] || (header.key === "item" ? i + 1 : "")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="bottom-area">
          <div className="left-controls">
            <div className="field-row priority">
              <label>Prioridad:</label>
              <div className="value-display">{job.prioridad || "N/A"}</div>
            </div>
            <div className="field-row">
              <label>Envío:</label>
              <div className="value-display">{job.envio || "N/A"}</div>
            </div>
            <div className="field-row">
              <label>Documento:</label>
              <div className="value-display">{job.documento || "N/A"}</div>
            </div>
          </div>
          <div className="right-bottom">
            <div className="observations">
              <div className="value-display">
                {job.observaciones || "Sin observaciones."}
              </div>
            </div>
            <div className="save-wrapper">
              <button className="action-button save-button" disabled>
                Guardar
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default MainPage;