import React from "react";
import "./css/MainPage.css"; 
import { useNavigate } from "react-router-dom"; 
import Header from "./Header";

const MainPage = () => {
  const navigate = useNavigate(); 
 const handlePriceListUser = () => {
    navigate("/PriceListuser");
  };
  const RequestMaterials = () =>{
    navigate("/RequestMaterials");
  }
  return (
    <>
      <Header />
      <div className="mainPage">
        <main className="contenedor-general-cards">
          <div className="contenedor-cards">
            
<section className="card preView">
    <h2>Vista de trabajos.</h2> 
    <span className="vista">
        <img
            className="card-icon" 
            src="https://i.imgur.com/Ftc3seh.png"
            alt="logo vista de trabajos"
        />
    </span>
    <p>Vea cuáles son los trabajos priorizados según la fecha de entrega.</p>
</section>

<section className="card lista" onClick={handlePriceListUser}>
    <h2>Lista de precios.</h2>
    <span className="lista">
        <img
            className="card-icon" 
            src="https://i.imgur.com/tqKQT8j.png"
            alt="logo lista de precios"
        />
    </span>
    <p>Vea todos los precios actualizados de los productos...</p>
</section>

<section className="card materialrequest" onClick={RequestMaterials}>
    <h2>Solicitud de materiales.</h2>
    <span className="solicitud">
        <img
            className="card-icon" 
            id="small-icon"
            src="https://i.imgur.com/DcYlKKD.png"
            alt="logo solicitud de materiales"
        />
    </span>
    <p>Solicita materiales que hagan falta para continuar con el trabajo.</p>
</section>


          </div>
        </main>
      </div>
    </>
  );
};

export default MainPage;