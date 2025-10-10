import React from "react";
import { useNavigate } from 'react-router-dom';
import "./css/JobCreation.css";
import Header from "./Header";
const MainPage = () => {
  const navigate = useNavigate();
  const Return = () => navigate('/main');
  return (<>
      <Header/>
      <main className="job-creation container">
        <button className="back-button action-button" onClick={Return}>Volver</button>
        <section className="job-info">
          <div className="left-col">
            <div className="field-row"><label htmlFor="razon">Razon social/cliente:</label><input id="razon" className="value-input" /></div>
            <div className="field-row"><label htmlFor="resp">Resp:</label><input id="resp" className="value-input" /></div>
            <div className="field-row"><label htmlFor="contact">Mail/Tel/Cel:</label><input id="contact" className="value-input" /></div>
            <div className="field-row"><label htmlFor="dir">Dir:</label><input id="dir" className="value-input" /></div>
          </div>
          <div className="right-col">
            <div className="field-row"><label htmlFor="ot">O/T Nº:</label><input id="ot" className="value-input" /></div>
            <div className="field-row"><label htmlFor="fecha">Fecha:</label><input id="fecha" className="value-input" /></div>
            <div className="field-row"><label htmlFor="fentrega">F/Entrega:</label><input id="fentrega" className="value-input" /></div>
            <div className="field-row"><label>Arch:</label>
              <div className="checkboxes">
                <label><input type="radio" name="arch" value="mail" /> Mail</label>
                <label><input type="radio" name="arch" value="serv" /> Serv.</label>
                <label><input type="radio" name="arch" value="otro" /> Otro</label>
              </div>
            </div>
          </div>
        </section>
        <section className="items-area">
          <div className="items-columns">
            <div className="col it">
              <div className="col-header">IT:</div>
              <div className="col-rows">{Array.from({ length: 10 }).map((_, i) => (<div key={i} className="row-cell"><input className="cell-input small" defaultValue={i + 1} /></div>))}</div>
            </div>
            <div className="col description">
              <div className="col-header">Descripcion:</div>
              <div className="col-rows">{Array.from({ length: 10 }).map((_, i) => (<div key={i} className="row-cell"><input className="cell-input"/></div>))}</div>
            </div>
            <div className="col originals">
              <div className="col-header">Originales:</div>
              <div className="col-rows">{Array.from({ length: 10 }).map((_, i) => (<div key={i} className="row-cell"><input className="cell-input small"/></div>))}</div>
            </div>
            <div className="col copies">
              <div className="col-header">Copias:</div>
              <div className="col-rows">{Array.from({ length: 10 }).map((_, i) => (<div key={i} className="row-cell"><input className="cell-input small"/></div>))}</div>
            </div>
            <div className="col paper">
              <div className="col-header">Papel:</div>
              <div className="col-rows">{Array.from({ length: 10 }).map((_, i) => (<div key={i} className="row-cell"><input className="cell-input"/></div>))}</div>
            </div>
            <div className="col format">
              <div className="col-header">Formato:</div>
              <div className="col-rows">{Array.from({ length: 10 }).map((_, i) => (<div key={i} className="row-cell"><input className="cell-input small"/></div>))}</div>
            </div>
            <div className="col colors">
              <div className="col-header">Colores:</div>
              <div className="col-rows">{Array.from({ length: 10 }).map((_, i) => (<div key={i} className="row-cell"><input className="cell-input small"/></div>))}</div>
            </div>
            <div className="col finishing">
              <div className="col-header">Terminacion:</div>
              <div className="col-rows">{Array.from({ length: 10 }).map((_, i) => (<div key={i} className="row-cell"><input className="cell-input"/></div>))}</div>
            </div>
          </div>
        </section>
        <section className="bottom-area">
          <div className="left-controls">
            <div className="field-row priority">
              <label>Prioridad:</label>
              <label><input type="radio" name="prioridad" value="A" /> A</label>
              <label><input type="radio" name="prioridad" value="M" /> M</label>
              <label><input type="radio" name="prioridad" value="B" /> B</label>
            </div>
            <div className="field-row">
              <label><input type="radio" name="envio" value="retira" /> Retira</label>
              <label><input type="radio" name="envio" value="envia" /> Envia</label>
            </div>
            <div className="field-row">
              <label><input type="radio" name="doc" value="rem" /> Rem.</label>
              <label><input type="radio" name="doc" value="fact" /> Fact.</label>
            </div>
          </div>
          <div className="right-bottom">
            <div className="observations"><textarea rows={4} placeholder="Obs:" /></div>
            <div className="save-wrapper"><button className="action-button save-button">Guardar</button></div>
          </div>
        </section>
      </main>
    </>
  );
};
export default MainPage;