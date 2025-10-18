// En QuotePDF.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import "./css/QuotePDF.css";

const { ipcRenderer } = window.require("electron");

const QuotePDF = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Datos de ejemplo
  const quoteData = {
    id: "01",
    empresa: "Kingdom",
    fecha: new Date().toLocaleDateString(),
    ubicacion: "Emilio Lamarca 1754", 
    cliente: "Nombre Apellido Cliente",
    email: "cliente@email.com",
    telefono: "11-2233-4455",
    precioImpresion: 15000,
    precioPersonalizacion: 2000,
    precioTerminacion: 1000,
    impuestos: 3780,
    total: 21780,
  };

  const handleReturn = () => {
    navigate("/Quotation");
  };

  const handleDownloadPDF = async () => {
    setLoading(true);
    const result = await ipcRenderer.invoke("generate-pdf");
    setLoading(false);

    if (result.ok) {
      alert(`PDF guardado exitosamente en: ${result.path}`);
    } else if (result.message !== "Guardado cancelado.") {
      alert(`Error al guardar PDF: ${result.message}`);
    }
  };

  return (
    <>
      <div className="pdf-ui-container">
        <Header />
        <div className="matMainCont">
          <button className="return" onClick={handleReturn} disabled={loading}>
            Volver
          </button>

          <div className="quote-form-container">
            <h2>Generar Cotización (O/T N°: {quoteData.id})</h2>

            <div className="detail-group">
              <h3>Datos del Cliente</h3>
              <p>
                <strong>Nombre:</strong> <span>{quoteData.cliente}</span>
              </p>
              <p>
                <strong>Email:</strong> <span>{quoteData.email}</span>
              </p>
              <p>
                <strong>Teléfono:</strong> <span>{quoteData.telefono}</span>
              </p>
            </div>

            <div className="detail-group">
              <h3>Detalles del Precio</h3>
              <p>
                <strong>Impresión:</strong>{" "}
                <span>${quoteData.precioImpresion}</span>
              </p>
              <p>
                <strong>Personalización:</strong>{" "}
                <span>${quoteData.precioPersonalizacion}</span>
              </p>
              <p>
                <strong>Terminación:</strong>{" "}
                <span>${quoteData.terminacion}</span>
              </p>
              <p>
                <strong>Impuestos:</strong> <span>${quoteData.impuestos}</span>
              </p>
              <p className="total">
                <strong>Total:</strong> <span>${quoteData.total}</span>
              </p>
            </div>

            <button
              className="download-btn"
              onClick={handleDownloadPDF}
              disabled={loading}
            >
              {loading ? "Generando..." : "Descargar PDF"}
            </button>
          </div>
        </div>
      </div>

      <div className="quote-print-layout">
        <header className="quote-header">
          <h1>{quoteData.empresa}</h1>
        </header>

        <div className="quote-subheader-info">
          <p>
            <strong>Orden de Trabajo N°:</strong> {quoteData.id}
          </p>
          <p>
            <strong>Fecha:</strong> {quoteData.fecha}
          </p>
          <p>
            <strong>Ubicación:</strong> {quoteData.ubicacion}
          </p>
        </div>

        <section className="quote-section">
          <h2>Detalles de la impresión</h2>
          <p>
            <strong>Tamaño de la impresión:</strong> <span>{/* data */}</span>
          </p>
          <p>
            <strong>Tipo de papel:</strong> <span>{/* data */}</span>
          </p>
          <p>
            <strong>Tipo de personalización:</strong> <span>{/* data */}</span>
          </p>
          <p>
            <strong>Tipo de terminación:</strong> <span>{/* data */}</span>
          </p>
        </section>

        <section className="quote-section">
          <h2>Datos del cliente</h2>
          <p>
            <strong>Nombre y apellido:</strong> <span>{quoteData.cliente}</span>
          </p>
          <p>
            <strong>Correo electrónico:</strong> <span>{quoteData.email}</span>
          </p>
          <p>
            <strong>Número de teléfono:</strong>{" "}
            <span>{quoteData.telefono}</span>
          </p>
        </section>
        <div className="quote-price-container">
          <div className="price-and-payment-column">
            <section className="quote-section price-details">
              <h2>Precio</h2>
              <p>
                <strong>Precio de la impresión:</strong>{" "}
                <span>${quoteData.precioImpresion}</span>
              </p>
              <p>
                <strong>Precio de la personalización:</strong>{" "}
                <span>${quoteData.precioPersonalizacion}</span>
              </p>
              <p>
                <strong>Precio de la terminación:</strong>{" "}
                <span>${quoteData.precioTerminacion}</span>
              </p>
              <p>
                <strong>Impuestos:</strong> <span>${quoteData.impuestos}</span>
              </p>
            </section>

            <section className="quote-section payment-method">
              <h3>Método de pago</h3>
              <p>
                <strong>Número de Cuenta:</strong> <span>{/* data */}</span>
              </p>
              <p>
                <strong>Número de Tarjeta:</strong> <span>{/* data */}</span>
              </p>
            </section>
          </div>

          <div className="total-price-column">
            <div className="total-price-box">
              <strong>Precio total:</strong>
              <span>${quoteData.total}</span>
            </div>
          </div>
        </div>

        <footer className="signatures">
          <div className="sign-line">
            <p>Firma de cliente</p>
          </div>
          <div className="sign-line">
            <p>DNI</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default QuotePDF;
