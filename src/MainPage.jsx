import React from 'react';
import './css/MainPage.css';
import Header from './Header';
const JobCreation = () => {
  return (
    <div className="mainPage">
      <Header />

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

export default JobCreation;
