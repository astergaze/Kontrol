import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import MainPageAdmin from './MainPageAdmin';
import Viewmaterialrequests from './Viewmaterialrequests'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />        {/* Página inicial */}
      <Route path="/main" element={<MainPageAdmin />} /> {/* Página destino */}
      
      <Route path="/Viewmaterialrequests" element={<Viewmaterialrequests />} /> {/* Página destino */}
    </Routes>
  );
};

export default App;
