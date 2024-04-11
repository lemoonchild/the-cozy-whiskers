import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

import './infoFactura.css'
import Input from '../components/input'
import Button from '../components/button'

import SelectInput from '../components/selectInput'

const InformacionFactura = () => {
  //Colocar el nombre de empleado y rol según el usuario
  const empleadoNombre = 'Nicolas Bethancourt'
  const rolEmpleado = 'Mesero'

  //Numero de mesa para el titulo
  const numeroMesa = 12

  //checkbox
  const [isDividedBill, setIsDividedBill] = useState(false) // Estado para el checkbox

  const handleCheckboxChange = (e) => {
    setIsDividedBill(e.target.checked) // Actualiza el estado cuando el checkbox cambia
  }

  //Opciones de pago
  const payOptions = [
    { value: 'efectivo', label: 'Efectivo' },
    { value: 'tarjera', label: 'Tarjeta' },
    { value: 'ambos', label: 'Ambos' },
  ]

  // Reloj
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="informacionFactura">
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
        <p className="main__title">
          {' '}
          <span>Informacion de factura para mesa #</span> {numeroMesa}
        </p>
        <p className="current-time">{currentTime.toLocaleTimeString()}</p>
      </div>

      <form className="factura__form">
        <div className="factura__column1">
          <div className="facturainput">
            <Input //INFORMACIÓN NIT
              className="table__input"
              label="Ingrese el NIT:"
              type="text"
              name="table"
              id="table"
              placeholder="Introduce el NIT"
              isNumeric={true}
            />
          </div>
          <div className="facturainput">
            <Input //INFORMACIÓN NOMBRE
              className="table__input"
              label="Ingrese el nombre:"
              type="text"
              name="table"
              id="table"
              placeholder="Introduce el nombre"
              isNumeric={false}
            />
          </div>
        </div>
        <div className="factura__column2">
          <div className="facturainput">
            <Input //INFORMACIÓN DE DIRECCION
              className="table__input"
              label="Ingrese la direccion:"
              type="text"
              name="table"
              id="table"
              placeholder="Introduce la direccion"
              isNumeric={false}
            />
          </div>
          <div className="facturainput">
            <SelectInput
              className="table__input"
              label="Tipo de pago:"
              name="role"
              id="role"
              options={payOptions}
            />
          </div>
        </div>
        <div className="checkbox-container">
          <label className="checkbox-label">
            <input type="checkbox" checked={isDividedBill} onChange={handleCheckboxChange} />
            ¿Necesita la cuenta dividida?
          </label>
        </div>
        <div className="factura__button-container">
          <Link to={'/verfactura'}>
            <Button text="Imprimir factura" />
          </Link>
        </div>
      </form>

      <div className="footer_factura">
        <p className="page__message">Your Second Home, with a Feline Twist</p>
      </div>
    </div>
  )
}

const InformaciondeFactura = ({ action }) => {
  return <div>{action === 'informacionFactura' && <InformacionFactura />}</div>
}

export default InformaciondeFactura
