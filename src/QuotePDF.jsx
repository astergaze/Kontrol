// En QuotePDF.js

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "./Header";
import "./css/QuotePDF.css";
import axios from "axios";

const { ipcRenderer } = window.require("electron");
const API_URL = "http://localhost:3001/api";

const QuotePDF = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // ID de la O/T

  // --- Estados de Datos ---
  const [jobData, setJobData] = useState(null);
  const [paperTypes, setPaperTypes] = useState([]);
  const [terminationTypes, setTerminationTypes] = useState([]);

  // --- Estado de Precios Calculados ---
  const [calculatedPrices, setCalculatedPrices] = useState(null);

  // --- Estados de Carga ---
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPdfGenerating, setIsPdfGenerating] = useState(false);

  const empresaData = {
    empresa: "Kingdom",
    ubicacion: "Emilio Lamarca 1754",
  };

  // 1. Cargar TODOS los datos necesarios al montar
  useEffect(() => {
    const fetchAllData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
        return;
      }
      const headers = { Authorization: token };

      try {
        setIsLoading(true);

        // Hacemos todas las peticiones en paralelo
        const [otRes, paperRes, termRes] = await Promise.all([
          axios.get(`${API_URL}/ot/${id}`, { headers }), // 1. Detalles de la O/T
          axios.get(`${API_URL}/papers`, { headers }),     // 2. Lista de papeles
          axios.get(`${API_URL}/terminations`, { headers }) // 3. Lista de terminaciones
        ]);

        setJobData(otRes.data);
        setPaperTypes(paperRes.data);
        setTerminationTypes(termRes.data);
        setError(null);

      } catch (err) {
        console.error("Error fetching data:", err);
        setError("No se pudieron cargar todos los datos para la cotización.");
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          navigate("/");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, [id, navigate]);

  // 2. Calcular Precios AUTOMÁTICAMENTE cuando los datos estén listos
  useEffect(() => {
    // Solo calcular si tenemos todos los datos necesarios
    if (!jobData || paperTypes.length === 0 || terminationTypes.length === 0) {
      return;
    }

    // Asumimos que los cálculos se basan en el primer item (DetalleOrden)
    const item = (jobData.DetalleOrdens && jobData.DetalleOrdens[0]) || null;
    if (!item) {
      console.warn("La O/T no tiene items (DetalleOrden) para calcular.");
      return;
    }

    // --- Lógica de Cálculo ---

    // A. Encontrar el precio base del papel
    const paperInfo = paperTypes.find(p => p.nombre === item.papel);
    const paperPrice = paperInfo ? parseFloat(paperInfo.precio) : 0;

    // B. Encontrar el precio base de la terminación
    const termInfo = terminationTypes.find(t => t.nombre === item.terminacion);
    const termPrice = termInfo ? parseFloat(termInfo.precio) : 0;

    // C. Calcular cantidad
    // (Asumimos que el precio es por hoja y la cantidad es originales * copias)
    const totalSheets = (parseInt(item.originales) || 0) * (parseInt(item.copias) || 1);

    // D. Calcular precios finales
    const precioImpresion = paperPrice * totalSheets;
    const precioTerminacion = termPrice * totalSheets;


    // E. Calcular Impuestos y Total
    const subtotal = precioImpresion + precioTerminacion;
    const impuestos = subtotal * 0.21; // Asumo 21% de IVA
    const total = subtotal + impuestos;

    // Guardar los precios calculados en el estado
    setCalculatedPrices({
      precioImpresion,
      precioTerminacion,
      impuestos,
      total,
    });

  }, [jobData, paperTypes, terminationTypes]); // Este efecto se re-ejecuta si los datos cambian


  const handleReturn = () => {
    navigate("/Quotation");
  };

  const handleDownloadPDF = async () => {
    if (!jobData || !calculatedPrices) {
      alert("No hay datos o los precios no se han calculado.");
      return;
    }

    setIsPdfGenerating(true);

    const fullData = {
      ...jobData,
      ...empresaData,
      fecha: new Date().toLocaleDateString(),

      // Adjuntamos los precios calculados en el formato que Electron espera
      OrdenCotizacion: calculatedPrices,
    };

    // Limpiamos el array original para no confundir a Electron
    delete fullData.OrdenCotizacions;

    const result = await ipcRenderer.invoke("generate-pdf", fullData);
    setIsPdfGenerating(false);

    if (result.ok) {
      alert(`PDF guardado exitosamente en: ${result.path}`);
    } else if (result.message !== "Guardado cancelado.") {
      alert(`Error al guardar PDF: ${result.message}`);
    }
  };

  // --- Renderizado Condicional ---

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="matMainCont">Cargando datos y listas de precios...</div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="matMainCont" style={{ color: "red" }}>
          {error}
          <button className="return" onClick={handleReturn}>
            Volver
          </button>
        </div>
      </>
    );
  }

  if (!jobData) {
    return (
      <>
        <Header />
        <div className="matMainCont">
          No se encontraron datos para la O/T N°: {id}
          <button className="return" onClick={handleReturn}>
            Volver
          </button>
        </div>
      </>
    );
  }

  // --- LÓGICA DE DATOS PARA RENDERIZAR ---
  const cliente = jobData.Cliente || {};
  const firstItem = (jobData.DetalleOrdens && jobData.DetalleOrdens[0]) || {};

  // Usamos los precios del estado 'calculatedPrices'
  const cotizacion = calculatedPrices || {}; // Usar objeto vacío si aún no se calculó

  // Formateador para los precios
  const formatPrice = (price) => {
    const num = parseFloat(price);
    return isNaN(num) ? "N/A" : num.toFixed(2);
  };
  // --- FIN LÓGICA DE DATOS ---


  return (
    <>
      {/* =================================================
       SECCIÓN DE UI (SOLO LECTURA)
      =================================================
      */}
      <div className="pdf-ui-container">
        <Header />
        <div className="matMainCont">
          <button className="return" onClick={handleReturn} disabled={isPdfGenerating}>
            Volver
          </button>

          <div className="quote-form-container">
            <h2>Generar Cotización (O/T N°: {jobData.id})</h2>

            <div className="detail-group">
              <h3>Datos del Cliente</h3>
              <p>
                <strong>Nombre:</strong> <span>{cliente.nomClien || "N/A"}</span>
              </p>
              <p>
                <strong>Contacto:</strong> <span>{cliente.contacto || "N/A"}</span>
              </p>
              <p>
                <strong>Dirección:</strong> <span>{cliente.direccion || "N/A"}</span>
              </p>
            </div>

            <div className="detail-group">
              <h3>Detalles del Precio (Cotización)</h3>
              {/* Mostramos el estado del cálculo */}
              {!calculatedPrices && jobData.DetalleOrdens && (
                <p style={{ color: 'blue' }}>
                  Calculando precios...
                </p>
              )}
              {calculatedPrices && (
                <p style={{ color: 'green' }}>
                  Precios calculados automáticamente. Listo para descargar.
                </p>
              )}
              {(!jobData.DetalleOrdens || jobData.DetalleOrdens.length === 0) && (
                <p style={{ color: 'gray' }}>
                  (No hay items en la O/T para calcular precios)
                </p>
              )}
            </div>

            <button
              className="download-btn"
              onClick={handleDownloadPDF}
              disabled={isPdfGenerating || !calculatedPrices} // Deshabilitado si no se han calculado
            >
              {isPdfGenerating ? "Generando..." : "Descargar PDF"}
            </button>
          </div>
        </div>
      </div>

      {/* =================================================
       SECCIÓN DE IMPRESIÓN (PDF) - ACTUALIZADA
      =================================================
      */}
      <div className="quote-print-layout">
        <header className="quote-header">
          <h1>{empresaData.empresa}</h1>
        </header>

        <div className="quote-subheader-info">
          <p>
            <strong>Orden de Trabajo N°:</strong> {jobData.id}
          </p>
          <p>
            <strong>Fecha:</strong> {new Date().toLocaleDateString()}
          </p>
          <p>
            <strong>Ubicación:</strong> {empresaData.ubicacion}
          </p>
        </div>

        <section className="quote-section">
          <h2>Detalles de la impresión (Item 1)</h2>
          <p>
            <strong>Descripción:</strong> <span>{firstItem.descripcion || 'N/A'}</span>
          </p>
          <p>
            <strong>Formato:</strong> <span>{firstItem.formato || 'N/A'}</span>
          </p>
          <p>
            <strong>Tipo de papel:</strong> <span>{firstItem.papel || 'N/A'}</span>
          </p>
          <p>
            <strong>Tipo de terminación:</strong> <span>{firstItem.terminacion || 'N/A'}</span>
          </p>
        </section>

        <section className="quote-section">
          <h2>Datos del cliente</h2>
          <p>
            <strong>Nombre y apellido:</strong> <span>{cliente.nomClien || 'N/A'}</span>
          </p>
          <p>
            <strong>Contacto (Email/Tel):</strong> <span>{cliente.contacto || 'N/A'}</span>
          </p>
          <p>
            <strong>Dirección:</strong>{" "}
            <span>{cliente.direccion || 'N/A'}</span>
          </p>
        </section>

        {/* --- SECCIÓN DE PRECIOS (AHORA USA LOS DATOS CALCULADOS) --- */}
        <div className="quote-price-container">
          <div className="price-and-payment-column">
            <section className="quote-section price-details">
              <h2>Precio</h2>
              <p><strong>Precio de la impresión:</strong> <span>$ {formatPrice(cotizacion.precioImpresion)}</span></p>
              <p><strong>Precio de la terminación:</strong> <span>$ {formatPrice(cotizacion.precioTerminacion)}</span></p>
              <p><strong>Impuestos:</strong> <span>$ {formatPrice(cotizacion.impuestos)}</span></p>
            </section>

            <section className="quote-section payment-method">
              <h3>Método de pago</h3>
              <p><strong>Número de Cuenta:</strong> <span>{/* data */}</span></p>
              <p><strong>Número de Tarjeta:</strong> <span>{/* data */}</span></p>
            </section>
          </div>

          <div className="total-price-column">
            <div className="total-price-box">
              <strong>Precio total:</strong>
              <span>$ {formatPrice(cotizacion.total)}</span>
            </div>
          </div>
        </div>
        {/* --- FIN SECCIÓN DE PRECIOS --- */}


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