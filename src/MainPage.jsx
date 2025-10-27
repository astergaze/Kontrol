import React from "react";
import "./css/MainPage.css"; 
import { useNavigate } from "react-router-dom"; 
import Header from "./Header";

const MainPage = () => {
  const navigate = useNavigate(); 
 const handlePriceListUser = () => {
    navigate("/PriceListuser");
  };
  return (
    <>
      <Header />
      <div className="mainPageAdmin">
        <main className="contenedor-general-cards">
          <div className="contenedor-cards">
            
            <section className="card preView">
              <h2>
                <span className="vista">
                  Vista de trabajos.
                  {" "}
                  <img
                    className="logo5"
                    src="https://i.imgur.com/Ftc3seh.png"
                    alt="logo vista de trabajos"
                  />
                </span>
              </h2>
              <p>
                Vea cuáles son los trabajos priorizados según la fecha de entrega.
              </p>
            </section>

            <section className="card lista" onClick={handlePriceListUser}>
              <h2>
                <span className="lista">
                  Lista de precios.
                  <img
                    className="logo4"
                    src="https://i.imgur.com/tqKQT8j.png"
                    alt="logo lista de precios"
                  />
                </span>
              </h2>
              <p>
                Vea todos los precios actualizados de los productos (tipo de papel,
                terminación y personalizaciones finales).
              </p>
            </section>
            <section className="card materialrequest">
              <h2>
                <span className="solicitud">
                  Solicitud de materiales.
                  {" "}
                  <img
                    className="logo3"
                    src="https://i.imgur.com/DcYlKKD.png"
                    alt="logo solicitud de materiales"
                  />
                </span>
              </h2>
              <p>
                Solicita materiales que hagan falta para continuar con el trabajo.
              </p>
            </section>

          </div>
        </main>
      </div>
    </>
  );
};

export default MainPage;