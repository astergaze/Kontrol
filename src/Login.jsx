import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/login.css';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/main');
  };

  return (
    <div className='mainCont'>
      <div className='loginForm'>
        <h2>Iniciar Sesión</h2>
        <p>Ingrese su DNI</p>
        <input type="number" name="DNI" id="DNIForm" className='loginInput' />
        <p>Ingrese su contraseña</p>
        <input type="password" name="Password" id="passwordForm" className='loginInput' />
        <button className='loginBtn' onClick={handleLogin}>Ingresar</button>
      </div>
    </div>
  );
};

export default Login;
