import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

import './infoReportes.css'

const VerReportes = () => {
  // Información sobre rango de fechas de reporte
  const fechaInicio = '11/03/2024'
  const fechaFin = '18/03/2024'

  // Datos de ejemplo directamente dentro de VerReportes
  const sampleData = [
    { id: 1, fecha: '12/03/2024', cliente: 'Empresa A', cantidad: 5, total: '$500.00' },
    { id: 2, fecha: '13/03/2024', cliente: 'Empresa B', cantidad: 3, total: '$300.00' },
    { id: 3, fecha: '14/03/2024', cliente: 'Empresa C', cantidad: 4, total: '$400.00' },
    { id: 4, fecha: '15/03/2024', cliente: 'Empresa D', cantidad: 2, total: '$200.00' },
    { id: 5, fecha: '16/03/2024', cliente: 'Empresa E', cantidad: 6, total: '$600.00' },
  ]

  // DynamicTable definido dentro de VerReportes
  const DynamicTable = ({ data }) => {
    const headers = data.length > 0 ? Object.keys(data[0]) : []

    return (
      <table>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((header, index) => (
                <td key={index}>{row[header]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  return (
    <div className="ver__reporte">
      <div className="header__reporte">
        <p className="titulo__reporte__main">
          <h3>Reporte the cozy whiskers</h3>
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

      <DynamicTable data={sampleData} />

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
