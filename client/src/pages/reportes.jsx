import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import './reportes.css';
import Button from '../components/button';
import PopupFecha from '../components/popUpfecha';

const ReportesAdmin = () => {
  const API_BASE_URL = 'https://the-cozy-whiskers-api-vercel.vercel.app';
  const [empleadoNombre, setEmpleadoNombre] = useState('');
  const [rolEmpleado, setRolEmpleado] = useState('');

  useEffect(() => {
    const fetchRoleName = async () => {
      const username = localStorage.getItem('userLocal');
      const password = localStorage.getItem('passwordLocal');

      try {
        const response = await fetch(`${API_BASE_URL}/get-role-name`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.status === 'success') {
          setEmpleadoNombre(data.data.nombre);
          setRolEmpleado(data.data.rol);
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

    fetchRoleName();
  }, []);
  // Reloj
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  //PopUp de fecha
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');

  const handleButtonClick = (fetch) => {
    localStorage.setItem('reportAPI', fetch);
    setIsPopupOpen(true); // Abre el pop-up
  };

  const handleDateSubmit = () => {
    localStorage.setItem('fechaInicio', fechaInicio);
    localStorage.setItem('fechaFin', fechaFin);
  };

  return (
    <div className="reportes">
      <div className="header">
        <img src="../../public/resources/mainlogo.png" alt="Logo" className="main__logo" />
        <div className="employee-info">
          <p className="name__empleado">
            <span>Empleado:</span> {empleadoNombre}
          </p>
          <p className="rol__empleado">
            <span>Rol:</span> {rolEmpleado}
          </p>
        </div>
      </div>
      <div className="header-title">
        <p className="main__title">Reportes the cozy whiskers</p>
        <p className="current-time">{currentTime.toLocaleTimeString()}</p>
      </div>

      <div className="reportes__button-container">
        <Button
          text="Platos más pedidos"
          className="reportes__button"
          onClick={() => handleButtonClick('report-most-ordered-dishes')} //POST: /report-most-ordered-dishes
        />

        <Button
          text="Hora pico de pedidos"
          className="reportes__button"
          onClick={() => handleButtonClick('report-most-orders-time-slot')}
        />

        <Button
          text="Promedio de tiempo de estadía de clientes"
          className="reportes__button"
          onClick={() => handleButtonClick('report-average-dining-time')}
        />
      </div>

      <div className="reportes__button-container">
        <Button
          text="Reporte de quejas por plato y bebida"
          className="reportes__button"
          onClick={() => handleButtonClick('report-complaints-by-dish')}
        />

        <Button
          text="Reporte de quejas por persona"
          className="reportes__button"
          onClick={() => handleButtonClick('report-complaints-by-person')}
        />
        <Link to="/verReporte">
          <Button //ESTE ES EL DE LOS 6 MESES
            text="Reporte de eficiencia de meseros"
            className="reportes__button"
            onClick={() =>
              localStorage.setItem('reportAPI', 'report-server-efficiency-last-6-months')
            }
          />
        </Link>
      </div>

      <PopupFecha isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
        <div>
          <h3 className="title-style-popup">Coloque un rango para generar el reporte:</h3>
          <div>
            <label>Fecha Inicio:</label>
            <input
              type="date"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
            />
          </div>
          <div>
            <label>Fecha Fin:</label>
            <input type="date" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} />
          </div>
          <Link to="/verReporte">
            <Button
              text="Generar Reporte"
              className="popup-button-fecha"
              onClick={handleDateSubmit}
            />
          </Link>
        </div>
      </PopupFecha>

      <div className="reportes__footer">
        <p className="page__message">Your Second Home, with a Feline Twist</p>
      </div>
    </div>
  );
};

const Reportes = ({ action }) => {
  return <div>{action === 'reportes' && <ReportesAdmin />}</div>;
};

export default Reportes;
