import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp'
import JobCreation from './JobCreation'
import MainPageAdmin from './MainPageAdmin';
import MaterialRequest from './Viewmaterialrequests';
import Chat from './Chat';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />        {/* Página inicial */}
      <Route path="/main" element={<MainPageAdmin />} /> {/* Página destino */}
      <Route path="/signup" element={<SignUp/>} /> {/* Pagina de alta de operadores */}
      <Route path="/jobcreation" element={<JobCreation/>} /> {/* Pagina de entrada de trabajos */}
      <Route path="/materialrequest" element={<MaterialRequest/>} /> {/* Pagina de entrada de trabajos */}
      <Route path="/chat" element={<Chat/>} /> {/* Pagina de entrada de trabajos */}
    </Routes>
  );
};

export default App;
  