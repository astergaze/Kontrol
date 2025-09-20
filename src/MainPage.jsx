import React from 'react'
import './css/MainPage.css'
const MainPage = () => {
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
          <small>Operador</small>
        </div>
      </div>
    </div>
  </header>

  <main>
    <section class="card grande">
      <h2>Vista de trabajos.</h2>
      <p>Vea cuales son los trabajos priorizados según la fecha de entrega</p>
      
    </section>

    <section class="card pequena">
      <h2>Lista de precios.</h2>
      <p>Vea todos los precios actualizados de los productos (Tipo de papel, terminación y personalizaciones finales).</p>
      
    </section>

    <section class="card pequena">
      <h2>Solicitud de materiales.</h2>
      <p>Solicita materiales que hagan falta para continuar con el trabajo</p>
      
    </section>
  </main>
</body>

  </>
}

export default MainPage