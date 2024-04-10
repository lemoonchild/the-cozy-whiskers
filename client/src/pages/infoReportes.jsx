import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/button'
import './infoReportes.css'

const VerReportes = () => {
  // Información sobre rango de fechas de reporte
  const fechaInicio = '11/03/2024'
  const fechaFin = '18/03/2024'

  return (
    <div className="ver__reporte">
      <div className="header__reporte">
        <p className="titulo__reporte__main">
          <h3>FACTURA</h3>
        </p>

        <Link to={'/reportes'}>
          <button className="close-button">X</button>
        </Link>
      </div>
      <img src="../resources/mainlogo.png" alt="Logo" className="main__logo__reporte" />
      <div className="info__empresa__reporte">
        <p>The Cozy Whiskers S.A</p>
        <p>Nit: 456778-2</p>
        <p>6a. Avenida 8-28 zona 9</p>
      </div>

      <div className="fecha__emision">
        <p>
          <span>Rango de Fechas: </span>
          {fechaInicio} - {fechaFin}
        </p>
      </div>

      <div className="footer_queja">
        <p className="page__message">Your Second Home, with a Feline Twist</p>
      </div>
    </div>
  )
}

const VerReporteAdmin = ({ action }) => {
  return <div>{action === 'verReporte' && <VerReportes />}</div>
}

export default VerReporteAdmin
