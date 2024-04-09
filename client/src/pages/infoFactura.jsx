import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

import './infoFactura.css'
import Button from '../components/button'

const InfoFactura = () => {
  //Colocar el nombre de empleado y rol según el usuario
  const empleadoNombre = 'Nicolas Bethancourt'
  const rolEmpleado = 'Mesero'

  // Reloj
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="infoFactura">
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
        <p className="main__title">¡Hola de nuevo!</p>
        <p className="current-time">{currentTime.toLocaleTimeString()}</p>
      </div>

      <form className="table__form">
        <Input //INFORMACIÓN DE USUARIO
          className="table__input"
          label="Ingresar Mesa"
          type="text"
          name="table"
          id="table"
          placeholder="Introduce el número de mesa"
          isNumeric={true}
        />
        <Input //INFORMACIÓN DE CONTRASEÑA
          className="table__input"
          label="Personas en la mesa"
          type="people-amount"
          name="people-amount"
          id="people-amount"
          placeholder="Introduce cuantas personas se encuentran en la mesa"
          isNumeric={true}
        />
        <div className="login__button-container">
          <Link to={'/ordenMesero'}>
            <Button
              text="Abrir cuenta"
              onClick={() => console.log('Cuenta abierta exitosamente')}
            />
          </Link>
        </div>
      </form>

      <div className="footer">
        <p className="page__message">Your Second Home, with a Feline Twist</p>
      </div>
    </div>
  )
}

const InfoFacturas = ({ action }) => {
  return <div>{action === 'infoFactura' && <InfoFactura />}</div>
}

export default InfoFacturas
