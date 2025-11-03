import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./css/ViewJob.css";
import Header from "./Header";
import { jwtDecode } from "jwt-decode";

const MainPage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

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

  const Return = () => {
    navigate("/PreViewJob");
  };

  if (!userData) {
    return null;
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
              <div className="value-display">Empresa S.A.</div>
            </div>
            <div className="field-row">
              <label>Resp:</label>
              <div className="value-display">Juan Pérez</div>
            </div>
            <div className="field-row">
              <label>Mail/Tel/Cel:</label>
              <div className="value-display">juan@empresa.com / 11-1234-5678</div>
            </div>
            <div className="field-row">
              <label>Dir:</label>
              <div className="value-display">Av. Siempre Viva 123</div>
            </div>
          </div>
          <div className="right-col">
            <div className="field-row">
              <label>O/T Nº:</label>
              <div className="value-display">OT-2025-001</div>
            </div>
            <div className="field-row">
              <label>Fecha:</label>
              <div className="value-display">2025-11-03</div>
            </div>
            <div className="field-row">
              <label>F/Entrega:</label>
              <div className="value-display">2025-11-10</div>
            </div>
            <div className="field-row">
              <label>Arch:</label>
              <div className="value-display">Mail</div>
            </div>
          </div>
        </section>
        <section className="items-area">
          <div className="items-columns">
            {["IT", "Descripcion", "Originales", "Copias", "Papel", "Formato", "Colores", "Terminacion", "Personalizacion"].map((header, colIndex) => (
              <div key={colIndex} className={`col ${header.toLowerCase()}`}>
                <div className="col-header">{header}:</div>
                <div className="col-rows">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className="row-cell">
                      <span className={`cell-display ${["IT", "Originales", "Copias", "Formato", "Colores"].includes(header) ? "small" : ""}`}>
                        {
                          header === "IT" ? i + 1 :
                          header === "Descripcion" ? `Descripción del ítem ${i + 1}` :
                          header === "Originales" ? "2" :
                          header === "Copias" ? "1" :
                          header === "Papel" ? "Obra 90gr" :
                          header === "Formato" ? "A4" :
                          header === "Colores" ? "CMYK" :
                          header === "Terminacion" ? "Encuadernado" :
                          header === "Personalizacion" ? "Logo impreso" : ""
                        }
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
              <div className="value-display">A</div>
            </div>
            <div className="field-row">
              <label>Envío:</label>
              <div className="value-display">Retira</div>
            </div>
            <div className="field-row">
              <label>Documento:</label>
              <div className="value-display">Rem.</div>
            </div>
          </div>
          <div className="right-bottom">
            <div className="observations">
              <div className="value-display">
                Cliente requiere entrega urgente. Revisar detalles técnicos antes de imprimir.
              </div>
            </div>
            <div className="save-wrapper">
              <button className="action-button save-button" disabled>Guardar</button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default MainPage;