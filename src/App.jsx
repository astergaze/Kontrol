import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp'
import MainPageAdmin from './MainPageAdmin';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />        {/* Página inicial */}
      <Route path="/main" element={<MainPageAdmin />} /> {/* Página destino */}
      <Route path="/signup" element={<SignUp/>} /> {/* Pagina de alta de operadores */}
    </Routes>
  );
};

export default App;
