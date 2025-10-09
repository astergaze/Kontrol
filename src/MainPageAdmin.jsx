import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import './css/MainPageAdmin.css';
import Header from './Header';
const MainPageAdmin = () => {
  const navigate = useNavigate();
    useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:3001/api/hello');
        console.log(response.data);
      } catch (error) {
        console.error('Error al hacer la petición:', error);
      }
    };

    fetchData();
  }, []);
  const handleAlta = () => {
    navigate('/Viewmaterialrequests');
  };
  return (
    <>
    <Header/>
    <div className="mainPageAdmin">
       
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

          <section className="card solicitud" onClick={handleAlta}>
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
