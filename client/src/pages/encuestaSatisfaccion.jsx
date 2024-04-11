import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import './encuestaSatisfaccion.css'
import Input from '../components/input'
import Button from '../components/button'
import Slider from '../components/slider'

const EncuestaSatisfaccion = () => {
  //Colocar el nombre de empleado y rol según el usuario
  const empleadoNombre = 'Nicolas Bethancourt'
  const rolEmpleado = 'Mesero'

  //Numero de cuenta a la que se le aplica la encuesta de satisfaccion
  const numeroCuenta = 12333

  //Sliders de preguntas
  const [sliderValue1, setSliderValue1] = useState(3) //default de 3
  const [sliderValue2, setSliderValue2] = useState(3)

  // Handlers para cada slider
  const handleSliderChange1 = (e) => {
    setSliderValue1(e.target.value)
  }
  const handleSliderChange2 = (e) => {
    setSliderValue2(e.target.value)
  }

  //Envio de la encuesta con boton
  const handleSubmit = () => {
    // Aquí enviar valores al backend
    console.log('Valores de la encuesta:', sliderValue1, sliderValue2)
  }

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
          <span>Encuesta satisfaccion para orden #</span> {numeroCuenta}
        </p>
        <p className="current-time">{currentTime.toLocaleTimeString()}</p>
      </div>

      <form className="encuesta__form">
        <Input //INFORMACIÓN NIT
          className="encuesta__input"
          label="Ingrese el NIT:"
          type="text"
          name="table"
          id="table"
          placeholder="Introduce el NIT"
          isNumeric={true}
        />

        <div className="slider-group">
          <p className="slider-label">Amabilidad:</p>
          <Slider //SLIDER DE AMABILIDAD
            min={1}
            max={5}
            value={sliderValue1}
            onChange={handleSliderChange1}
            step={1}
          />
        </div>
        <div className="slider-group">
          <p className="slider-label">Exactitud:</p>
          <Slider //SLIDER DE EXACTITUD
            min={1}
            max={5}
            value={sliderValue2}
            onChange={handleSliderChange2}
            step={1}
          />
        </div>

        <div className="encuesta__button-container">
          <Link to={'/mesaMesero'}>
            <Button
              text="Enviar encuesta" //Aquí se puede utilizar para guardar la información de la encuesta
              onClick={() => handleSubmit()}
            />
          </Link>
        </div>
      </form>

      <div className="encuesta_footer">
        <p className="page__message">Your Second Home, with a Feline Twist</p>
      </div>
    </div>
  )
}

const EncuestaSatisfaccionMesero = ({ action }) => {
  return <div>{action === 'encuestaSatisfaccion' && <EncuestaSatisfaccion />}</div>
}

export default EncuestaSatisfaccionMesero
