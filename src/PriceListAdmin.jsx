import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./css/PriceListAdmin.css";
import Header from "./Header";

const API_URL = "http://localhost:3001/api";

const PriceListAdmin = () => {
  const navigate = useNavigate();

  const [paperTypes, setPaperTypes] = useState([]);
  const [terminationTypes, setTerminationTypes] = useState([]);

  useEffect(() => {
    const fetchPriceLists = async () => {
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
        const [paperRes, termRes] = await Promise.all([
          axios.get(`${API_URL}/papers`, { headers: headers }),
          axios.get(`${API_URL}/terminations`, { headers: headers }),
        ]);

        setPaperTypes(paperRes.data);
        setTerminationTypes(termRes.data);
      } catch (error) {
        console.error("Error al cargar las listas de precios:", error);
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          alert("Su sesión ha expirado. Por favor, inicie sesión nuevamente.");
          localStorage.removeItem("token"); // Limpiar token inválido
          navigate("/");
        } else {
          alert("No se pudieron cargar los precios del servidor.");
        }
      }
    };

    fetchPriceLists();
  }, [navigate]);

  const Return = () => {
    navigate("/main");
  };
  const Modify = () => {
    navigate("/ModifyPrice");
  };

  return (
    <>
      <Header />{" "}
      <button className="returnf" onClick={Return}>
        Volver{" "}
      </button>{" "}
      <div className="PriceList">
        <div className="titulo-principal">Lista de precios</div>{" "}
        <div className="lista-precios">
          {" "}
          <div>
            <h3>Tipo De Papel</h3>{" "}
            <ul>
              {" "}
              {paperTypes.map((papel) => (
                <li key={papel.id}>
                  {papel.nombre} <span className="precio">${papel.precio}</span>{" "}
                </li>
              ))}{" "}
            </ul>{" "}
          </div>{" "}
          <div>
            <h3>Terminación</h3>{" "}
            <ul>
              {" "}
              {terminationTypes.map((term) => (
                <li key={term.id}>
                  {term.nombre} <span className="precio">${term.precio}</span>{" "}
                </li>
              ))}{" "}
            </ul>{" "}
          </div>{" "}
        </div>{" "}
        <button className="modificar-btn" onClick={Modify}>
          Modificar{" "}
        </button>{" "}
      </div>{" "}
    </>
  );
};

export default PriceListAdmin;
