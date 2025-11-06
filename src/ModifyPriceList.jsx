import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'; 
import Header from "./Header";
import "./css/ModifyPriceList.css";

const API_URL = "http://localhost:3001/api";

const ModifyPriceList = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("papel");

  const [paperTypes, setPaperTypes] = useState([]);
  const [terminationTypes, setTerminationTypes] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const [addForm, setAddForm] = useState({ nombre: "", precio: "" });
  const [modifyForm, setModifyForm] = useState({ id: '', nombre: "", precio: "" });

  const fetchLists = async () => {
    try {
      const [paperRes, termRes] = await Promise.all([
        axios.get(`${API_URL}/papers`),
        axios.get(`${API_URL}/terminations`)
      ]);

      const papersData = paperRes.data;
      const termData = termRes.data;

      const mappedPapers = papersData.map(p => ({
        id: p.idPapel,    
        nombre: p.nombre,  
        precio: p.precio   
      }));

      const mappedTerms = termData.map(t => ({
        id: t.idTerminacion, 
        nombre: t.nombre,     
        precio: t.precio      
      }));


      setPaperTypes(mappedPapers);
      setTerminationTypes(mappedTerms);

      if (activeTab === 'papel') {
        setSelectedItem(mappedPapers[0] || null);
      } else {
        setSelectedItem(mappedTerms[0] || null);
      }

    } catch (error) {
      console.error("Error cargando las listas:", error);
      const message = error.response?.data?.message || "Error al cargar datos del servidor.";

    }
  };

  useEffect(() => {
    fetchLists();
  }, []);

  useEffect(() => {
    if (selectedItem) {
      setModifyForm(selectedItem);
    } else {
      setModifyForm({ id: '', nombre: "", precio: "" });
    }
  }, [selectedItem]);

  const Return = () => {
    navigate("/PriceListAdmin");
  };

  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    setAddForm({ nombre: "", precio: "" });

    if (tabName === "papel") {
      setSelectedItem(paperTypes[0] || null);
    } else {
      setSelectedItem(terminationTypes[0] || null);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault(); 
    
    const endpoint = activeTab === "papel" ? `${API_URL}/createPaper` : `${API_URL}/createTerminacion`;

    try {
      // (Esta parte estaba bien)
      const res = await axios.post(endpoint, {
        newName: addForm.nombre,
        newPrice: addForm.precio
      });
      
      setAddForm({ nombre: "", precio: "" }); 
      await fetchLists(); 

    } catch (error) {
      console.error(`Error añadiendo a ${activeTab}:`, error);
      const message = error.response?.data?.message || error.message || "Error al añadir";

    }
  };

  const handleModify = async (e) => {
    e.preventDefault(); 
    if (!modifyForm || !modifyForm.id) {

      return;
    }

    const endpoint = activeTab === "papel" ? `${API_URL}/updatePaper` : `${API_URL}/updateTerminacion`;
    const idKey = activeTab === "papel" ? "idTipoPapel" : "idTerminacion";

    try {
      const res = await axios.post(endpoint, {
        [idKey]: modifyForm.id,      
        newName: modifyForm.nombre,  
        newPrice: modifyForm.precio   
      });

      await fetchLists();

    } catch (error) {
      console.error(`Error modificando en ${activeTab}:`, error);
      const message = error.response?.data?.message || error.message || "Error al modificar";
 
    }
  };

  const handleDelete = async () => {
    if (!selectedItem || !selectedItem.id) {
      return;
    }


    const endpoint = activeTab === "papel" 
      ? `${API_URL}/paper/${selectedItem.id}` 
      : `${API_URL}/termination/${selectedItem.id}`;

    try {
      const res = await axios.delete(endpoint);
      await fetchLists();

    } catch (error) {
      console.error(`Error eliminando de ${activeTab}:`, error);
      const message = error.response?.data?.message || error.message || "Error al eliminar";

    }
  };

  return (<>
    <Header />
    <div className="modify-page-container">
      <button className="returnf" onClick={Return}>
        Volver
      </button>

      <div className="modify-main-container">
        <div className="modify-title">Modificar</div>

        <div className="modify-content-layout">
          {/* --- PANEL IZQUIERDO --- */}
          <div className="left-panel">
            <div className="tab-container">
              <button
                className={`tab-btn ${activeTab === "papel" ? "active" : ""}`}
                onClick={() => handleTabClick("papel")} 
              >
                Tipo de papel
              </button>
              <button
                className={`tab-btn ${activeTab === "terminacion" ? "active" : ""}`}
                onClick={() => handleTabClick("terminacion")}
              >
                Terminación
              </button>
            </div>

            {/* Contenido de la pestaña "Tipo de papel" */}
            {activeTab === "papel" && (
              <div className="tab-content">
                {/* Sección AGREGAR (Papel) */}
                <div className="action-section">
                  <h3>Agregar</h3>
                  <form className="action-form">
                    <div className="form-group">
                      <label>Ingresar Nombre</label>
                      <input
                        type="text"
                        value={addForm.nombre}
                        onChange={(e) => setAddForm({...addForm, nombre: e.target.value})}
                      />
                    </div>
                    <div className="form-group">
                      <label>Ingresar Precio</label>
                      <input
                        type="number"
                        value={addForm.precio}
                        onChange={(e) => setAddForm({...addForm, precio: e.target.value})}
                      />
                    </div>
                    <button 
                      type="button" 
                      className="btn btn-add" 
                      onClick={handleAdd}
                    >
                      Añadir
                    </button>
                  </form>
                </div>

                {/* Sección MODIFICAR (Papel) */}
                <div className="action-section">
                  <h3>Modificar</h3>
                  <form className="action-form">
                    <div className="form-group">
                      <label>Modificar Nombre</label>
                      <input
                        type="text"
                        value={modifyForm.nombre}
                        onChange={(e) => setModifyForm({...modifyForm, nombre: e.target.value})}
                        disabled={!selectedItem}
                      />
                    </div>
                    <div className="form-group">
                      <label>Modificar Precio</label>
                      <input
                        type="number"
                        value={modifyForm.precio}
                        onChange={(e) => setModifyForm({...modifyForm, precio: e.target.value})}
                        disabled={!selectedItem}
                      />
                    </div>
                    <div className="modify-buttons">
                      <button 
                        type="button" 
                        className="btn btn-accept" 
                        disabled={!selectedItem}
                        onClick={handleModify}
                      >
                        Aceptar
                      </button>
                      <button 
                        type="button" 
                        onClick={handleDelete} 
                        className="btn btn-delete" 
                        disabled={!selectedItem}
                      >
                        Eliminar
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
            
            {/* Contenido de la pestaña "Terminación" */}
            {activeTab === "terminacion" && (
              <div className="tab-content">
                {/* Sección AGREGAR (Terminación) */}
                <div className="action-section">
                  <h3>Agregar</h3>
                  <form className="action-form">
                    <div className="form-group">
                      <label>Ingresar Nombre</label>
                      <input
                        type="text"
                        value={addForm.nombre}
                        onChange={(e) => setAddForm({...addForm, nombre: e.target.value})}
                      />
                    </div>
                    <div className="form-group">
                      <label>Ingresar Precio</label>
                      <input
                        type="number"
                        value={addForm.precio}
                        onChange={(e) => setAddForm({...addForm, precio: e.target.value})}
                      />
                    </div>
                    <button 
                      type="button" 
                      className="btn btn-add" 
                      onClick={handleAdd}
                    >
                      Añadir
                    </button>
                  </form>
                </div>
                
                {/* Sección MODIFICAR (Terminación) */}
                <div className="action-section">
                  <h3>Modificar</h3>
                  <form className="action-form">
                    <div className="form-group">
                      <label>Modificar Nombre</label>
                      <input
                        type="text"
                        value={modifyForm.nombre}
                        onChange={(e) => setModifyForm({...modifyForm, nombre: e.target.value})}
                        disabled={!selectedItem}
                      />
                    </div>
                    <div className="form-group">
                      <label>Modificar Precio</label>
                      <input
                        type="number"
                        value={modifyForm.precio}
                        onChange={(e) => setModifyForm({...modifyForm, precio: e.target.value})}
                        disabled={!selectedItem}
                      />
                    </div>
                    <div className="modify-buttons">
                      <button 
                        type="button" 
                        className="btn btn-accept" 
                        disabled={!selectedItem}
                        onClick={handleModify}
                      >
                        Aceptar
                      </button>
                      <button 
                        type="button" 
                        onClick={handleDelete} 
                        className="btn btn-delete" 
                        disabled={!selectedItem}
                      >
                        Eliminar
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>

          {/* --- PANEL DERECHO --- */}
          <div className="right-panel">
            
            {activeTab === 'papel' && (
              <div className="list-display">
                <div className="list-header">
                  <span>Tipo De Papel</span>
                  <span>Precio</span>
                </div>
                <ul className="price-list">
                  {paperTypes.map((item) => (
                    <li
                      key={item.id}
                      className={`list-item ${selectedItem && selectedItem.id === item.id ? "selected" : ""}`}
                      onClick={() => handleSelectItem(item)}
                    >
                      <span>-{item.nombre}</span>
                      <span>${item.precio}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {activeTab === 'terminacion' && (
              <div className="list-display">
                <div className="list-header">
                  <span>Terminación</span>
                  <span>Precio</span>
                </div>
                <ul className="price-list">
                  {terminationTypes.map((item) => (
                    <li
                      key={item.id}
                      className={`list-item ${selectedItem && selectedItem.id === item.id ? "selected" : ""}`}
                      onClick={() => handleSelectItem(item)}
                    >
                      <span>{item.nombre}</span> 
                      <span>${item.precio}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ModifyPriceList;