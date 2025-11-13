import React from "react";
import "./css/MainPageAdmin.css";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
const MainPageAdmin = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/signup");
  };

  const handleJobCreation = () => {
    navigate("/jobcreation");
  };

  const handleMaterialRequest = () => {
    navigate("/materialrequest");
  };
  const handlePriceListAdmin = () => {
    navigate("/PriceListAdmin");
  };
  const handleQuotation = () => {
    navigate("/Quotation")
  }
  const handlePreViewJob = () => {
    navigate("/PreViewJob")
  }

  return (
    <>
      <Header />
      <div className="mainPageAdmin">
        <main className="contenedor-general-cards">
          <div className="contenedor-cards">
          <section className="card jobcreation" onClick={handleJobCreation}>
            <h2>Entrada del trabajo.</h2>
            <span className="entrada">
              <img
                className="card-icon small-icon" 
                src="https://i.imgur.com/CTGB4c8.png"
                alt="logo entrada de trabajo"
              />
            </span>
            <p>Cliente, cotización, generación de orden de trabajo.</p>
          </section>

   
          <section className="card lista" onClick={handlePriceListAdmin}>
            <h2>Lista de precios.</h2>
            <span className="lista">
              <img
                className="card-icon"
                src="https://i.imgur.com/tqKQT8j.png"
                alt="logo lista de precios"
              />
            </span>
            <p>Precios actualizados de los productos.</p>
          </section>
            <section className="card" onClick={handleQuotation}>
              <h2>Generar cotizacion.</h2>
                <span className="cotizacion">
                  <img
                    className="card-icon small-icon"
                    src="https://i.imgur.com/TYS7bE4.png"
                    alt="logo generar cotizacion"
                  />
                </span>
              
              <p>Generación de PDF de cotización.</p>
            </section>

            <section className="card preView" onClick={handlePreViewJob}>
              <h2>Vista de trabajos.</h2>
                <span className="vista">
                  <img
                    className="card-icon"
                    src="https://i.imgur.com/Ftc3seh.png"
                    alt="logo vista de trabajos"
                  />
                </span>
              <p>
                Vea cuáles son los trabajos
                <br />
                priorizados según la fecha de entrega
              </p>
            </section>

            <section
              className="card materialrequest"
              onClick={handleMaterialRequest}
            >
              <h2> Ver solicitudes de materiales. </h2>
                <span className="solicitud">
                  <img
                    className="card-icon small-icon"
                    src="https://i.imgur.com/DcYlKKD.png"
                    alt="logo ver solicitudes de materiales"
                  />
                </span>
              <p>
                Ve las solicitudes de materiales que fueron hechas por los
                operadores.
              </p>
            </section>

            <section className="card signup" onClick={handleSignUp}>
              <h2> Alta de Operadores.</h2>
                <span className="azul">
                  <img
                    className="card-icon"
                    src="https://i.imgur.com/fjRwV7z.png"
                    alt="logo alta de operadores"
                  />
                </span>
              <p>Da de alta a los nuevos usuarios que ingresen a Kingdom.</p>
            </section>
          </div>
        </main>
      </div>
    </>
  );
};

export default MainPageAdmin;
