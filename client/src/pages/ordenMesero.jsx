import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

import './ordenMesero.css'
import Button from '../components/button'

import PopupEditable from '../components/popUpEditable'

const OrdenMesero = () => {
  //Numero de mesa
  const numeroMesa = 12

  // Reloj
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Estado para manejar la entrada de búsqueda
  const [searchTerm, setSearchTerm] = useState('')

  // Estado para la lista filtrada de platos o bebidas
  const [filteredDishes, setFilteredDishes] = useState([])

  // Lista simulada de platos o bebidas
  const dishes = [
    'Bagel con huevo, jamón y queso',
    'Bagel con huevo y tocino',
    'Bagel con huevo y frijol',
    'Bagel con huevo y aguacate',
    'NATANAEL',
    // ... más platos o bebidas
  ]

  //Busqueda
  const handleSearch = (event) => {
    const value = event.target.value
    console.log('Valor de búsqueda:', value) // Debería mostrar la entrada del usuario
    setSearchTerm(value)
    if (value) {
      const filtered = dishes.filter((dish) => dish.toLowerCase().includes(value.toLowerCase()))
      console.log('Platos filtrados:', filtered) // Debería mostrar los platos filtrados
      setFilteredDishes(filtered)
    } else {
      setFilteredDishes([])
    }
  }

  // PopUp
  const [isPopupEditableOpen, setIsPopupEditableOpen] = useState(false)
  const [currentDishName, setCurrentDishName] = useState('')

  const openPopupEditable = (dishName) => {
    setCurrentDishName(dishName)
    setIsPopupEditableOpen(true)
  }

  return (
    <div className="ordenMesero">
      <div className="header">
        <img src="../resources/mainlogo.png" alt="Logo" className="main__logo" />
        <div className="employee-info">
          <Link to={'/infoFactura'}>
            <Button
              text="Cerrar cuenta"
              onClick={() => console.log('Cuenta cerrada exitosamente')}
            />
          </Link>
        </div>
      </div>
      <div className="header-title">
        <p className="main__title">
          <span>Orden de mesa #</span> {numeroMesa}
        </p>
        <p className="current-time">{currentTime.toLocaleTimeString()}</p>
      </div>
      <div className="search__food">
        <label className="search-label">Buscar plato o bebida:</label>
        <input
          type="text"
          placeholder="Buscar plato o bebida"
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
        {searchTerm && (
          <div className="search-results">
            {filteredDishes.map((dish, index) => (
              <div key={index} className="search-item" onClick={() => openPopupEditable(dish)}>
                {dish}
              </div>
            ))}
          </div>
        )}

        <PopupEditable
          isOpen={isPopupEditableOpen}
          closePopup={() => setIsPopupEditableOpen(false)}
          dishName={currentDishName}
        />
      </div>
      <div className="button__orden">
        <Link to={'/verPedidoMesero'}>
          <Button text="Ver pedido" onClick={() => console.log('Ver pedido')} />
        </Link>
      </div>

      <div className="footer">
        <p className="page__message">Your Second Home, with a Feline Twist</p>
      </div>
    </div>
  )
}

const OrdenMeseros = ({ action }) => {
  return <div>{action === 'ordenMesero' && <OrdenMesero />}</div>
}

export default OrdenMeseros
