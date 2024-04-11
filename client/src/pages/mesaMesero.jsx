import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

import './mesaMesero.css'
import Input from '../components/input'
import Button from '../components/button'
import SelectInput from '../components/selectInput'

const MeseroMesa = () => {
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

  //Busqueda de mesa
  // Estado para la mesa seleccionada
  const [selectedTable, setSelectedTable] = useState('')

  // Opciones de mesas disponibles para el select
  const availableTablesOptions = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
  ].map((tableNumber) => ({
    label: `Mesa ${tableNumber}`,
    value: tableNumber,
  }))

  return (
    <div className="mesaMesero">
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
        <SelectInput
          label="Seleccionar mesa:"
          name="table"
          id="table-select"
          options={availableTablesOptions}
          onChange={(e) => setSelectedTable(e.target.value)}
          size="4"
        />
        <Input //INFORMACIÓN DE PERSONAS EN MESA
          className="table__input__mesero"
          label="Personas en la mesa"
          type="people-amount"
          name="people-amount"
          id="people-amount"
          placeholder="Introduce cuantas personas se encuentran en la mesa"
          isNumeric={true}
        />
        <div className="mesa__button__container">
          <Link to={'/ordenMesero'}>
            <Button
              text="Abrir cuenta" //Opción de abrir cuenta
              onClick={() => console.log('Cuenta abierta exitosamente')}
            />
          </Link>
        </div>
        <div className="mesa__button__container__orden">
          <Link to={'/mesaCuentaAbierta'}>
            <Button
              text="Buscar cuenta existente" //Opción de buscar cuenta existente
              onClick={() => console.log('Cuenta abierta exitosamente')}
            />
          </Link>
        </div>
      </form>

      <div className="footer_mesa">
        <p className="page__message">Your Second Home, with a Feline Twist</p>
      </div>
    </div>
  )
}

const MesaMesero = ({ action }) => {
  return <div>{action === 'mesaMesero' && <MeseroMesa />}</div>
}

export default MesaMesero
