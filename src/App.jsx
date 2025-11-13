import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";
import JobCreation from "./JobCreation";
import MainPageAdmin from "./MainPageAdmin";
import MainPage from "./MainPage";
import MaterialRequest from "./Viewmaterialrequests";
import Chat from "./Chat";
import PriceListAdmin from "./PriceListAdmin"
import PreViewJob from "./PreViewJob";
import Quotation from "./Quotation";
import QuotePDF from "./QuotePDF"
import PriceListuser from "./PriceListuser"
import Profile from "./Profile"
import ViewJob from "./ViewJob"
import RequestMaterials from "./Requestmaterials"

import ModifyPriceList from "./ModifyPriceList"

import ChangePassword from "./ChangePwd";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} /> {/* Página inicial */}
      <Route path="/main" element={<MainPageAdmin />} /> {/* Página destino */}
      <Route path="/mainU" element={<MainPage />} /> {/* Página destino */}
      <Route path="/signup" element={<SignUp />} />{" "}
      {/* Pagina de alta de operadores */}
      <Route path="/jobcreation" element={<JobCreation />} />{" "}
      {/* Pagina de entrada de trabajos */}
      <Route path="/materialrequest" element={<MaterialRequest />} />{" "}
      {/* Pagina de entrada de trabajos */}
      <Route path="/chat" element={<Chat />} />{" "}
      {/* Pagina de entrada de trabajos */}
      <Route path="/PriceListAdmin" element={<PriceListAdmin />} />{" "}
      {/* Pagina de entrada de trabajos */}
      <Route path="/PreViewJob" element={<PreViewJob />} />{" "}
      <Route path="/ViewJob" element={<ViewJob />} />{" "}
      {/* Pagina de vista previa de trabajos*/}
      <Route path="/Quotation" element={<Quotation />} />{" "}
      {/*Pagina previa a la generacion del pdf */}
      <Route path="/QuotePDF" element={<QuotePDF />} />{" "}
      {/*Pagina de generacion del pdf */}
      <Route path="/PriceListuser" element={<PriceListuser />} />{" "}
      <Route path="/ModifyPrice" element={<ModifyPriceList />} />{" "}
      {/*Pagina de cambio de contraseña */}
      <Route path="/ChangePwd" element={<ChangePassword />} />{" "}
      {/*Pagina del perfil de usuario (/me) */}
      <Route path="/Profile" element={<Profile />} />{" "}
      <Route path="/RequestMaterials" element={<RequestMaterials />} />{" "}
    </Routes>
  );
};

export default App;
