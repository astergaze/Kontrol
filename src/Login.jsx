import React from 'react'
import './css/login.css'
const Login = () => {
  return <>
    <div className='mainCont'>
      <div className='loginForm'>
        <h2>Iniciar Sesion</h2>
        <p>Ingrese su DNI</p>
        <input type="number" name="DNI" id="DNIForm" className='loginInput' />
        <p>Ingrese su contraseña</p>
        <input type="password" name="Password" id="passwordForm" className='loginInput' />
        <button className='loginBtn'>Ingresar</button>
      </div>
    </div>
  </>
}

export default Login