import React from 'react';
import './css/JobCreation.css';

const MainPage = () => {
  return (
    <div className="mainPage">
      <header>
        <div className="logo">
          <img src="https://i.imgur.com/2ToRgc7.png" alt="Logo Kingdom"/>
        </div>
        <div className="usuario">
          <div className="iconos-superior">
            <span className="chat"><img src="https://i.imgur.com/mwR5HzO.png" alt="logo chat" /></span>
            <span className="bell"><img src="https://i.imgur.com/S4nFOIE.png" alt="logo campana" /></span>
          </div>
          <div className="perfil">
            <span className="icono-user"><img src="https://i.imgur.com/ZBIlQwo.png" alt="logo usuario" /></span>
            <div>
              <p>UsuarioEjemplo</p>
              <small>Operador</small>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="card grande">
          <h2>Vista de trabajos.</h2>
          <p>Vea cuáles son los trabajos priorizados según la fecha de entrega.</p>
        </section>

        <section className="card pequena">
          <h2>Lista de precios.</h2>
          <p>Vea todos los precios actualizados de los productos (tipo de papel, terminación y personalizaciones finales).</p>
        </section>

        <section className="card pequena">
          <h2>Solicitud de materiales.</h2>
          <p>Solicita materiales que hagan falta para continuar con el trabajo.</p>
        </section>
      </main>
    </div>
  );
};

export default MainPage;
