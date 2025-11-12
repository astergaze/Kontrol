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
        const [paperRes, termRes] = await Promise.all([
          axios.get(`${API_URL}/papers`),
          axios.get(`${API_URL}/terminations`),
        ]);

        setPaperTypes(paperRes.data);
        setTerminationTypes(termRes.data);
      } catch (error) {
        console.error("Error al cargar las listas de precios:", error);
        alert("No se pudieron cargar los precios del servidor.");
      }
    };

    fetchPriceLists();
  }, []);

  const Return = () => {
    navigate("/main");
  };
  const Modify = () => {
    navigate("/ModifyPrice");
  };

  return (
    <>
      <Header />

      <button className="returnf" onClick={Return}>
        Volver
      </button>

      <div className="PriceList">
        <div className="titulo-principal">Lista de precios</div>

        <div className="lista-precios">
          <div>
            <h3>Tipo De Papel</h3>
            <ul>
              {paperTypes.map((papel) => (
                <li key={papel.id}>
                  {" "}
                  {papel.nombre} <span className="precio">${papel.precio}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3>Terminación</h3>
            <ul>
              {terminationTypes.map((term) => (
                <li key={term.id}>
                  {" "}
                  {term.nombre} <span className="precio">${term.precio}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <button className="modificar-btn" onClick={Modify}>
          Modificar
        </button>
      </div>
    </>
  );
};

export default PriceListAdmin;
