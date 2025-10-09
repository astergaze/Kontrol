import React from 'react';
import './css/Header.css';

const Header = () => {
  return (
    <div className="mainPageheader">
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
    </div>
  );
};

export default Header;
