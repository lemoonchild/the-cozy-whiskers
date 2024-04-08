import React, { useState, useEffect, useRef } from 'react'
import './mesaOrdenMesero.css'
import Card from '../components/input'
import Popup from '../components/popUp'

const MeseroMesa = () => {
  const empleadoNombre = 'Juan Perez'
  const rolEmpleado = 'Cocinero'

  // Reloj
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="mesero__mesa">
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
        <p className="main__title">Pedidos</p>
        <p className="current-time">{currentTime.toLocaleTimeString()}</p>
      </div>

      <div className="footer">
        <p className="page__message">Your Second Home, with a Feline Twist</p>
      </div>
    </div>
  )
}

const OrdenMesero = () => {}

const MesaOrdenMesero = ({ action }) => {
  return (
    <div>
      {action === 'mesaMesero' && <MeseroMesa />}
      {action === 'ordenMesero' && <OrdenMesero />}
    </div>
  )
}

export default MesaOrdenMesero
