import React from "react";
import { useNavigate } from "react-router-dom";
const NotificationMenu = () => {
    //preparado para una futura integracion al darle click a la notificacion
    const navigate = useNavigate();

  return (
    <>
        <div className="notifMenu">
            <div><p>Notificacion Ejemplo 1</p></div>
            <div><p>Notificacion Ejemplo 2</p></div>
            <div><p>Notificacion Ejemplo 3</p></div>
            <div><p>Notificacion Ejemplo 4</p></div>
            <div><p>Notificacion Ejemplo 5</p></div>
            <div><p>Notificacion Ejemplo 6</p></div>
            <div><p>Notificacion Ejemplo 7</p></div>
        </div>
    </>
  );
};

export default NotificationMenu;
