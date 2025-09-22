import React from 'react';
import './css/MainPageAdmin.css';

const MainPageAdmin = () => {
  return (
    <>
    <div className="mainPageAdmin">
      <header>
        <div className="logo">
          <h1><span>KINGDOM</span> GRAPHICS</h1>
        </div>
        <div className="usuario">
          <div className="iconos-superior">
            <span className="chat">💬</span>
            <span className="bell">🔔</span>
          </div>
          <div className="perfil">
            <span className="icono-user">👤</span>
            <div>
              <p>UsuarioEjemplo</p>
              <small>Administrador</small>
            </div>
          </div>
        </div>
      </header>

      <main className="contenedor-general-cards">
        <div  className="contenedor-cards">
          <section className="card">
            <h2><span className="azul">Entrada del trabajo.</span></h2>
            <p>Cliente, cotización, generación de orden de trabajo.</p>
          </section>

          <section className="card">
            <h2><span className="azul">Lista de precios.</span></h2>
            <p>Precios actualizados de los productos.</p>
          </section>

          <section className="card">
            <h2><span className="azul">Generar cotización.</span></h2>
            <p>Generación de PDF de cotización.</p>
          </section>

          <section className="card">
            <h2><span className="azul">Vista de trabajos.</span></h2>
            <p>Vea cuáles son los trabajos<br />priorizados según la fecha de entrega</p>
          </section>

          <section className="card">
            <h2><span className="azul">Ver solicitudes de materiales.</span></h2>
            <p>Ve las solicitudes de materiales que fueron hechas por los operadores.</p>
          </section>

          <section className="card">
            <h2><span className="azul">Alta de Operadores.</span></h2>
            <p>Da de alta a los nuevos usuarios que ingresen a Kingdom.</p>
          </section>
        </div>
      </main>
    </div>
  </>
  );
};

export default MainPageAdmin;
