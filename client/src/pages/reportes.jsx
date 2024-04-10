import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

import './reportes.css'
import Button from '../components/button'
import PopupFecha from '../components/popUpfecha'

const ReportesAdmin = () => {
  //Colocar el nombre de empleado y rol según el usuario
  const empleadoNombre = 'Nicolas Bethancourt'
  const rolEmpleado = 'Administrador'

  // Reloj
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  //PopUp de fecha
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [fechaInicio, setFechaInicio] = useState('')
  const [fechaFin, setFechaFin] = useState('')

  const generarReporte = () => {
    console.log('Reporte generado con el rango de fechas:', fechaInicio, '-', fechaFin)
  }

  return (
    <div className="reportes">
      <div className="header">
        <img src="../resources/mainlogo.png" alt="Logo" className="main__logo" />
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
          onClick={() => setIsPopupOpen(true)}
        />

        <Button
          text="Horas pico de pedidos"
          className="reportes__button"
          onClick={() => setIsPopupOpen(true)}
        />

        <Button
          text="Promedio de tiempo de estadía de clientes"
          className="reportes__button"
          onClick={() => setIsPopupOpen(true)}
        />
      </div>

      <div className="reportes__button-container">
        <Button
          text="Reporte de quejas por plato y bebida"
          className="reportes__button"
          onClick={() => setIsPopupOpen(true)}
        />

        <Button
          text="Reporte de quejas por persona"
          className="reportes__button"
          onClick={() => setIsPopupOpen(true)}
        />

        <Button text="Reporte de eficiencia de meseros" className="reportes__button" />
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
          <Button text="Generar Reporte" onClick={generarReporte} className="popup-button-fecha" />
        </div>
      </PopupFecha>

      <div className="reportes__footer">
        <p className="page__message">Your Second Home, with a Feline Twist</p>
      </div>
    </div>
  )
}

const Reportes = ({ action }) => {
  return <div>{action === 'reportes' && <ReportesAdmin />}</div>
}

export default Reportes
