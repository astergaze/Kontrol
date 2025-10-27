import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import "./css/ModifyPriceList.css"; 

const initialPaperTypes = [
  { id: 1, nombre: "Papel bond", precio: 2105 },
  { id: 2, nombre: "Papel reciclado", precio: 2105 },
  { id: 3, nombre: "Papel fotográfico", precio: 2105 },
  { id: 4, nombre: "Cartulina", precio: 2105 },
];

const initialTerminationTypes = [
    { id: 1, nombre: "Corte y Troquelado", precio: 2105 },
    { id: 2, nombre: "Laminado y Barnizado", precio: 2105 },
    { id: 3, nombre: "Encuadernación", precio: 2105 },
    { id: 4, nombre: "Plegado y Doblado", precio: 2105 },
    { id: 5, nombre: "Montaje y Ensamblaje", precio: 2105 },
    { id: 6, nombre: "Personalización Final", precio: 2105 },
];

const ModifyPriceList = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("papel");

  const [paperTypes, setPaperTypes] = useState(initialPaperTypes);
  const [terminationTypes, setTerminationTypes] = useState(initialTerminationTypes);
  const [selectedItem, setSelectedItem] = useState(paperTypes[0]); 

  const [addForm, setAddForm] = useState({ nombre: "", precio: "" });
  const [modifyForm, setModifyForm] = useState(selectedItem);

  React.useEffect(() => {
    if(selectedItem) {
        setModifyForm(selectedItem);
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
  
  const handleAdd = (e) => {
    e.preventDefault();
    console.log(`Añadiendo a ${activeTab}:`, addForm);
    setAddForm({ nombre: "", precio: "" });
  };

  const handleModify = (e) => {
    e.preventDefault();
    console.log(`Modificando en ${activeTab}:`, modifyForm);
  };
  
  const handleDelete = () => {
    console.log(`Eliminando de ${activeTab}:`, selectedItem);
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
              {/* --- MODIFICADO: onClick usa la nueva función --- */}
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
                  <form onSubmit={handleAdd} className="action-form">
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
                    <button type="submit" className="btn btn-add">Añadir</button>
                  </form>
                </div>

                {/* Sección MODIFICAR (Papel) */}
                <div className="action-section">
                  <h3>Modificar</h3>
                  <form onSubmit={handleModify} className="action-form">
                    <div className="form-group">
                      <label>Modificar Nombre</label>
                      <input
                        type="text"
                        value={modifyForm.nombre}
                        onChange={(e) => setModifyForm({...modifyForm, nombre: e.target.value})}
                      />
                    </div>
                    <div className="form-group">
                      <label>Modificar Precio</label>
                      <input
                        type="number"
                        value={modifyForm.precio}
                        onChange={(e) => setModifyForm({...modifyForm, precio: e.target.value})}
                      />
                    </div>
                    <div className="modify-buttons">
                      <button type="submit" className="btn btn-accept">Aceptar</button>
                      <button type="button" onClick={handleDelete} className="btn btn-delete">Eliminar</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
            
            {/* --- MODIFICADO: Contenido de la pestaña "Terminación" --- */}
            {activeTab === "terminacion" && (
              <div className="tab-content">
                {/* Sección AGREGAR (Terminación) */}
                <div className="action-section">
                  <h3>Agregar</h3>
                  <form onSubmit={handleAdd} className="action-form">
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
                    <button type="submit" className="btn btn-add">Añadir</button>
                  </form>
                </div>
                
                {/* Sección MODIFICAR (Terminación) */}
                <div className="action-section">
                  <h3>Modificar</h3>
                  {/* Los formularios 'modifyForm', 'handleModify' y 'handleDelete' 
                      funcionan automáticamente porque 'selectedItem' 
                      se actualiza al cambiar de pestaña */}
                  <form onSubmit={handleModify} className="action-form">
                    <div className="form-group">
                      <label>Modificar Nombre</label>
                      <input
                        type="text"
                        value={modifyForm.nombre}
                        onChange={(e) => setModifyForm({...modifyForm, nombre: e.target.value})}
                      />
                    </div>
                    <div className="form-group">
                      <label>Modificar Precio</label>
                      <input
                        type="number"
                        value={modifyForm.precio}
                        onChange={(e) => setModifyForm({...modifyForm, precio: e.target.value})}
                      />
                    </div>
                    <div className="modify-buttons">
                      <button type="submit" className="btn btn-accept">Aceptar</button>
                      <button type="button" onClick={handleDelete} className="btn btn-delete">Eliminar</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
            {/* -------------------------------------------------------- */}

          </div>

          {/* --- PANEL DERECHO (MODIFICADO) --- */}
          <div className="right-panel">
            
            {/* --- Renderizado Condicional: LISTA DE PAPELES --- */}
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