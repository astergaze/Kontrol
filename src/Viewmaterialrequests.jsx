import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/Viewmaterialrequests.css';
import Header from './Header';
import { response } from 'express';
const Materials = () => {
    const [dato,setdato] = useState([])
    const nombre = async() =>{
        const response = await axios.get('url',)
    }
    setdato(response.dato)
    useEffect(() => {
nombre
}, []);
  return (
    <>
    <Header/>
    <div className='mainCont'>
      {dato.map((datos)=>{
        return(
            <li>
                <p>Material:{datos.dato}</p>
                <p>Orden de trabajo:{datos.dato}</p>
                <input type="button" value="" id="" />
                <input type="button" value="" id="" />
            </li>
        )
      })}
    </div>
    </>
  );
};

export default Materials;