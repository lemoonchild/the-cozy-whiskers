import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/button'
import './cocineroBarista.css'
import Card from '../components/card'

const Cocinero = () => {
  //Colocar el nombre de empleado y rol según el usuario
  const empleadoNombre = 'Juan Perez'
  const rolEmpleado = 'Cocinero'

  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)

    return () => clearInterval(timer)
  }, [])

  const dishes = [
    { id: 1, image: '../resources/bread.jpg', time: '12:20 pm', title: '1 plato' },
    { id: 2, image: '../resources/bread.jpg', time: '12:20 pm', title: '2 plato' },
    { id: 3, image: '../resources/bread.jpg', time: '12:20 pm', title: '3 plato' },
    { id: 4, image: '../resources/bread.jpg', time: '12:20 pm', title: '4 plato' },
    { id: 5, image: '../resources/bread.jpg', time: '12:20 pm', title: '5 plato' },
    { id: 6, image: '../resources/bread.jpg', time: '12:20 pm', title: '6 plato' },
    { id: 7, image: '../resources/bread.jpg', time: '12:20 pm', title: '7 plato' },
  ]

  const handlePrepareClick = (dishId) => {
    console.log('Preparar plato', dishId)
  }

  return (
    <div className="cocinero">
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
      <div className="cocinero-layout">
        {dishes
          .sort((a, b) => a.id - b.id)
          .map((dish) => (
            <Card
              key={dish.id}
              image={dish.image}
              time={dish.time}
              title={dish.title}
              onPrepareClick={() => handlePrepareClick(dish.id)}
            />
          ))}
      </div>

      <div className="footer">
        <p className="page__message">Your Second Home, with a Feline Twist</p>
      </div>
    </div>
  )
}

const Barista = () => {
  return (
    <div className="cocinero">
      <div className="header">
        <img src="../resources/mainlogo.png" alt="Logo" className="main__logo" />
        <p className="name__empleado">Empleado</p>
        <p className="rol__empleado">Rol</p>
      </div>

      <div className="pedidos__box">
        <Link>
          <Button text="¡Entrar!" onClick={() => console.log('Ingresar')} />
        </Link>
      </div>
      <div className="footer"></div>
    </div>
  )
}

const CocineroBarista = ({ action }) => {
  return (
    <div>
      {action === 'cocinero' && <Cocinero />}
      {action === 'barista' && <Barista />}
    </div>
  )
}

export default CocineroBarista
