
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./css/PriceListuser.css";
import Header from "./Header";

const API_URL = "http://localhost:3001/api";

const PriceList = () => {
  const navigate = useNavigate();
  const [paperTypes, setPaperTypes] = useState([]);
  const [terminationTypes, setTerminationTypes] = useState([]);

  useEffect(() => {
    const fetchPriceLists = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
            headers: { Authorization: token }
        };

        // 2. Enviamos el token en la petición (segundo argumento de axios.get)
        const [paperRes, termRes] = await Promise.all([
          axios.get(`${API_URL}/papers`, config),
          axios.get(`${API_URL}/terminations`, config),
        ]);

        setPaperTypes(paperRes.data);
        setTerminationTypes(termRes.data);
      } catch (error) {
        console.error("Error al cargar las listas de precios:", error);
        // Si el error es 401, significa que el token venció o es inválido.
        // Aquí decidimos si redirigir o no. Por seguridad, si da 401, 
        // suele ser bueno sacar al usuario, pero si quieres ignorarlo, borra este if.
        if (error.response && error.response.status === 401) {
             navigate("/"); 
        }
      }
    };

    fetchPriceLists();
  }, [navigate]);

  const Return = () => {
    navigate("/mainU");
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
                  {term.nombre} <span className="precio">${term.precio}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default PriceList;