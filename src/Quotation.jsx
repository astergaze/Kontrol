import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./css/PreViewJob.css";
import Header from "./Header";
import axios from "axios";

const Quotation = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("No token found, redirecting to login.");
        navigate("/");
        return;
      }

      try {
        // --- CORRECCIÓN AQUÍ ---
        // La ruta correcta es /api/ot/lista según tu server.js
        const response = await axios.get("http://localhost:3001/api/ot/lista", {
          headers: { Authorization: token },
        });

        setJobs(response.data);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError("Error al cargar las órdenes de trabajo.");
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          localStorage.removeItem("token");
          navigate("/");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [navigate]);

  const handleGen = (id) => {
    navigate(`/QuotePDF/${id}`);
  };

  const Return = () => {
    navigate("/main");
  };

  const renderContent = () => {
    if (loading) {
      return <p>Cargando órdenes...</p>;
    }

    if (error) {
      return <p style={{ color: "red" }}>{error}</p>;
    }

    if (jobs.length === 0) {
      return <p>No se encontraron órdenes de trabajo.</p>;
    }

    return jobs.map((job) => (
      <div
        key={job.id}
        className="requestCard"
        onClick={() => handleGen(job.id)}
        style={{ cursor: "pointer" }}
      >
        <div className="orderNumber">O/T N°: {job.id}</div>
        {/* Usamos 'fechaFin' que sí es devuelto por la API */}
        <div className="expiration">Vencimiento: {job.fechaFin || "N/A"}</div>
        <div className="state">Estado: {job.estado}</div>
      </div>
    ));
  };

  return (
    <>
      <Header />
      <div className="matMainCont">
        <button className="return" onClick={Return}>
          Volver
        </button>
        {renderContent()}
      </div>
    </>
  );
};

export default Quotation;