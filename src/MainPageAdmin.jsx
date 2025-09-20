import React from 'react'
import './css/MainPageAdmin.css'
const MainPageAdmin = () => {
  return <>
<body>
  <header>
    <div class="logo">
    
      <h1><span>KINGDOM</span> GRAPHICS</h1>
    </div>
    <div class="usuario">
      <div class="iconos-superior">
        <span class="chat">💬</span>
        <span class="bell">🔔</span>
      </div>
      <div class="perfil">
        <span class="icono-user">👤</span>
        <div>
          <p>UsuarioEjemplo</p>
          <small>Administrador</small>
        </div>
      </div>
    </div>
  </header>
  <main class="contenedor-cards">
    <section class="card">
      <h2><span class="azul">Entrada del trabajo.</span></h2>
      <p>Cliente, cotización, generación de orden de trabajo.</p>
    </section>

    <section class="card">
      <h2><span class="azul">Lista de precios.</span></h2>
      <p>Precios actualizados de los productos.</p>
    </section>

    <section class="card">
      <h2><span class="azul">Generar cotización.</span></h2>
      <p>Generación de PDF de cotización.</p>
    </section>

    <section class="card">
      <h2><span class="azul">Vista de trabajos.</span></h2>
      <p>Vea cuales son los trabajos <br></br>priorizados según la fecha de entrega</p>
    </section>

    <section class="card">
      <h2><span class="azul">Ver solicitudes de materiales.</span></h2>
      <p>Ve las solicitudes de materiales que fueron hechas por los operadores</p>
    </section>

    <section class="card">
      <h2><span class="azul">Alta de Operadores.</span></h2>
      <p>Da de alta a los nuevos usuarios que ingresen a Kingdom</p>
    </section>
  </main>
</body>
</>
}

export default MainPageAdmin