import React from "react";
import { useNavigate } from "react-router-dom";
import "./css/PriceListuser.css";
import Header from "./Header";
const PriceList = () => {
    const navigate = useNavigate();

    const Return = () => {
        navigate("/mainU");
    };

    return (
        <>
            <Header />

            <button className="returnf" onClick={Return}>
                Volver
            </button>
            <div className="PriceList">
                <div className="titulo-principal">Lista de precios</div>

                <div className="lista-precios">
                    <div>
                        <h3>Tipo De Papel</h3>
                        <ul>
                            <li>Papel bond <span className="precio">$2105</span></li>
                            <li>Papel reciclado <span className="precio">$2105</span></li>
                            <li>Papel fotográfico <span className="precio">$2105</span></li>
                            <li>Cartulina <span className="precio">$2105</span></li>
                        </ul>
                    </div>

                    <div>
                        <h3>Terminación</h3>
                        <ul>
                            <li>Corte y Troquelado <span className="precio">$2105</span></li>
                            <li>Laminado y Barnizado <span className="precio">$2105</span></li>
                            <li>Encuadernación <span className="precio">$2105</span></li>
                            <li>Plegado y Doblado <span className="precio">$2105</span></li>
                            <li>Montaje y Ensamblaje <span className="precio">$2105</span></li>
                            <li>Personalización Final <span className="precio">$2105</span></li>
                        </ul>
                    </div>

                    <div>
                        <h3>Personalización Final(opciones)</h3>
                        <ul>
                            <li>Estampado</li>
                            <li>Numeración</li>
                            <li>Detalles únicos</li>
                        </ul>
                    </div>

                </div>
            </div>
        </>
    );
};

export default PriceList;
