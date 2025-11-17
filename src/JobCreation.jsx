import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./css/JobCreation.css";
import Header from "./Header";
import { jwtDecode } from "jwt-decode";
import axios from "axios"; // Importar axios

const MainPage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  // --- Estados del Formulario ---
  const [cliente, setCliente] = useState({
    razon: "",
    resp: "",
    contact: "",
    dir: "",
  });
  const [orden, setOrden] = useState({
    ot: "",
    fecha: "",
    fentrega: "",
    arch: "",
    prioridad: "",
    envio: "",
    doc: "",
    observaciones: "",
  });
  const [items, setItems] = useState(
    Array.from({ length: 10 }, (_, i) => ({
      item: i + 1,
      descripcion: "",
      originales: "",
      copias: "",
      papel: "",
      formato: "",
      colores: "",
      terminacion: "",
    }))
  );
  // -----------------------------

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
    if (userData && userData.role === "jefe") {
      navigate("/main");
    } else {
      navigate("/mainU");
    }
  };

  // --- Handlers para actualizar el estado ---

  const handleChange = (e, setState) => {
    const { id, value } = e.target;
    setState((prev) => ({ ...prev, [id]: value }));
  };

  const handleRadioChange = (e, setState) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (index, field, value) => {
    setItems((prev) => {
      const newItems = [...prev];
      newItems[index] = { ...newItems[index], [field]: value };
      return newItems;
    });
  };

  // --- Handler para Guardar (Corregido) ---
  const handleSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No autenticado");
      navigate("/");
      return;
    }

    const payload = {
      clienteData: cliente,
      ordenData: {
        ...orden,
        fechaIn: orden.fecha || null,
        fechaFin: orden.fentrega || null,
      },
      itemsData: items.filter(
        (item) => item.descripcion && item.descripcion.trim() !== ""
      ),
    };

    try {
      const response = await axios.post(
        "http://localhost:3001/api/ot/crear", // URL completa
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token, // <-- CORRECCIÓN: Enviar solo el token, sin "Bearer "
          },
        }
      );

      alert("Orden de trabajo guardada con éxito");
      Return();
    } catch (error) {
      console.error("ERROR EN EL BLOQUE CATCH:", error);
      if (error.response) {
        console.error("Datos del error (response):", error.response.data);
        alert(
          `Error al guardar: ${
            error.response.data.message || "Error del servidor"
          }`
        );
      } else if (error.request) {
        console.error("Error en la petición (request):", error.request);
        alert("Error de red: No se pudo conectar con el servidor.");
      } else {
        alert(`Error inesperado: ${error.message}`);
      }
    }
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
              <label htmlFor="razon">Razon social/cliente:</label>
              <input
                id="razon"
                className="value-input"
                value={cliente.razon}
                onChange={(e) => handleChange(e, setCliente)}
              />
            </div>
            <div className="field-row">
              <label htmlFor="resp">Resp:</label>
              <input
                id="resp"
                className="value-input"
                value={cliente.resp}
                onChange={(e) => handleChange(e, setCliente)}
              />
            </div>
            <div className="field-row">
              <label htmlFor="contact">Mail/Tel/Cel:</label>
              <input
                id="contact"
                className="value-input"
                value={cliente.contact}
                onChange={(e) => handleChange(e, setCliente)}
              />
            </div>
            <div className="field-row">
              <label htmlFor="dir">Dir:</label>
              <input
                id="dir"
                className="value-input"
                value={cliente.dir}
                onChange={(e) => handleChange(e, setCliente)}
              />
            </div>
          </div>
          <div className="right-col">
            <div className="field-row">
              <label htmlFor="ot">O/T Nº:</label>
              <input
                id="ot"
                className="value-input"
                value={orden.ot}
                onChange={(e) => handleChange(e, setOrden)}
                placeholder="Dejar vacío para autogenerar"
              />
            </div>
            <div className="field-row">
              <label htmlFor="fecha">Fecha:</label>
              <input
                id="fecha"
                type="date"
                className="value-input"
                value={orden.fecha}
                onChange={(e) => handleChange(e, setOrden)}
              />
            </div>
            <div className="field-row">
              <label htmlFor="fentrega">F/Entrega:</label>
              <input
                id="fentrega"
                type="date"
                className="value-input"
                value={orden.fentrega}
                onChange={(e) => handleChange(e, setOrden)}
              />
            </div>
            <div className="field-row">
              <label>Arch:</label>
              <div className="checkboxes">
                <label>
                  <input
                    type="radio"
                    name="arch"
                    value="mail"
                    checked={orden.arch === "mail"}
                    onChange={(e) => handleRadioChange(e, setOrden)}
                  />{" "}
                  Mail
                </label>
                <label>
                  <input
                    type="radio"
                    name="arch"
                    value="serv"
                    checked={orden.arch === "serv"}
                    onChange={(e) => handleRadioChange(e, setOrden)}
                  />{" "}
                  Serv.
                </label>
                <label>
                  <input
                    type="radio"
                    name="arch"
                    value="otro"
                    checked={orden.arch === "otro"}
                    onChange={(e) => handleRadioChange(e, setOrden)}
                  />{" "}
                  Otro
                </label>
              </div>
            </div>
          </div>
        </section>
        <section className="items-area">
          <div className="items-columns">
            {/* Columna IT */}
            <div className="col it">
              <div className="col-header">IT:</div>
              <div className="col-rows">
                {items.map((item, i) => (
                  <div key={i} className="row-cell">
                    <input
                      className="cell-input small"
                      value={item.item}
                      readOnly // El 'item' (número) no debe ser editable
                    />
                  </div>
                ))}
              </div>
            </div>
            {/* Columna Descripcion */}
            <div className="col description">
              <div className="col-header">Descripcion:</div>
              <div className="col-rows">
                {items.map((_, i) => (
                  <div key={i} className="row-cell">
                    <input
                      className="cell-input"
                      value={items[i].descripcion}
                      onChange={(e) =>
                        handleItemChange(i, "descripcion", e.target.value)
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
            {/* Columna Originales */}
            <div className="col originals">
              <div className="col-header">Originales:</div>
              <div className="col-rows">
                {items.map((_, i) => (
                  <div key={i} className="row-cell">
                    <input
                      className="cell-input small"
                      type="number"
                      value={items[i].originales}
                      onChange={(e) =>
                        handleItemChange(i, "originales", e.target.value)
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
            {/* Columna Copias */}
            <div className="col copies">
              <div className="col-header">Copias:</div>
              <div className="col-rows">
                {items.map((_, i) => (
                  <div key={i} className="row-cell">
                    <input
                      className="cell-input small"
                      type="number"
                      value={items[i].copias}
                      onChange={(e) =>
                        handleItemChange(i, "copias", e.target.value)
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
            {/* Columna Papel */}
            <div className="col paper">
              <div className="col-header">Papel:</div>
              <div className="col-rows">
                {items.map((_, i) => (
                  <div key={i} className="row-cell">
                    <input
                      className="cell-input"
                      value={items[i].papel}
                      onChange={(e) =>
                        handleItemChange(i, "papel", e.target.value)
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
            {/* Columna Formato */}
            <div className="col format">
              <div className="col-header">Formato:</div>
              <div className="col-rows">
                {items.map((_, i) => (
                  <div key={i} className="row-cell">
                    <input
                      className="cell-input small"
                      value={items[i].formato}
                      onChange={(e) =>
                        handleItemChange(i, "formato", e.target.value)
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
            {/* Columna Colores */}
            <div className="col colors">
              <div className="col-header">Colores:</div>
              <div className="col-rows">
                {items.map((_, i) => (
                  <div key={i} className="row-cell">
                    <input
                      className="cell-input small"
                      value={items[i].colores}
                      onChange={(e) =>
                        handleItemChange(i, "colores", e.target.value)
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
            {/* Columna Terminacion */}
            <div className="col finishing">
              <div className="col-header">Terminacion:</div>
              <div className="col-rows">
                {items.map((_, i) => (
                  <div key={i} className="row-cell">
                    <input
                      className="cell-input"
                      value={items[i].terminacion}
                      onChange={(e) =>
                        handleItemChange(i, "terminacion", e.target.value)
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className="bottom-area">
          <div className="left-controls">
            <div className="field-row priority">
              <label>Prioridad:</label>
              <label>
                <input
                  type="radio"
                  name="prioridad"
                  value="A"
                  checked={orden.prioridad === "A"}
                  onChange={(e) => handleRadioChange(e, setOrden)}
                />{" "}
                A
              </label>
              <label>
                <input
                  type="radio"
                  name="prioridad"
                  value="M"
                  checked={orden.prioridad === "M"}
                  onChange={(e) => handleRadioChange(e, setOrden)}
                />{" "}
                M
              </label>
              <label>
                <input
                  type="radio"
                  name="prioridad"
                  value="B"
                  checked={orden.prioridad === "B"}
                  onChange={(e) => handleRadioChange(e, setOrden)}
                />{" "}
                B
              </label>
            </div>
            <div className="field-row">
              <label>
                <input
                  type="radio"
                  name="envio"
                  value="Retira"
                  checked={orden.envio === "Retira"}
                  onChange={(e) => handleRadioChange(e, setOrden)}
                />{" "}
                Retira
              </label>
              <label>
                <input
                  type="radio"
                  name="envio"
                  value="Envia"
                  checked={orden.envio === "Envia"}
                  onChange={(e) => handleRadioChange(e, setOrden)}
                />{" "}
                Envia
              </label>
            </div>
            <div className="field-row">
              <label>
                <input
                  type="radio"
                  name="doc"
                  value="Rem"
                  checked={orden.doc === "Rem"}
                  onChange={(e) => handleRadioChange(e, setOrden)}
                />{" "}
                Rem.
              </label>
              <label>
                <input
                  type="radio"
                  name="doc"
                  value="Fact"
                  checked={orden.doc === "Fact"}
                  onChange={(e) => handleRadioChange(e, setOrden)}
                />{" "}
                Fact.
              </label>
            </div>
          </div>
          <div className="right-bottom">
            <div className="observations">
              <textarea
                rows={4}
                placeholder="Obs:"
                id="observaciones"
                value={orden.observaciones}
                onChange={(e) => handleChange(e, setOrden)}
              />
            </div>
            <div className="save-wrapper">
              <button
                className="action-button save-button"
                onClick={handleSave}
              >
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