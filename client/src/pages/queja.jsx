import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import './queja.css'
import Button from '../components/button'
import Input from '../components/input'
import Slider from '../components/slider'
import RadioButton from '../components/radioButton'

const QuejaProducto = () => {
  //Colocar el nombre de empleado y rol según el usuario
  const empleadoNombre = 'Nicolas Bethancourt'
  const rolEmpleado = 'Mesero'
  //Numero de mesa
  const numeroCuenta = 12

  //Slider
  const [sliderValue, setSliderValue] = useState(3)

  // Handlers para cada slider
  const handleSliderChange = (e) => {
    setSliderValue(e.target.value)
  }

  // Reloj
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  //RadioButton
  // Estado para los radio buttons
  const [selectedOption, setSelectedOption] = useState('')

  // Handler para los cambios en los radio buttons
  const handleRadioChange = (e) => {
    setSelectedOption(e.target.value)
  }

  //Elementos para la busqueda

  //Datos de prueba
  const data = {
    empleados: [
      { id: 1, label: 'Juan Perez' },
      { id: 2, label: 'Ana Gómez' },
      { id: 1, label: 'Juan Perez' },
      { id: 2, label: 'Ana Gómez' },
      { id: 1, label: 'Juan Perez' },
      { id: 2, label: 'Ana Gómez' },
    ],
    platos: [
      { id: 1, label: 'Bagel con huevo, jamón y queso' },
      { id: 2, label: 'Bagel con huevo y tocino' },
      // ... rest of your platos
    ],
    bebidas: [
      { id: 1, label: 'Coca Cola' },
      { id: 2, label: 'Agua Mineral' },
    ],
  }

  // Estado para manejar la entrada de búsqueda y los resultados filtrados
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredResults, setFilteredResults] = useState([])

  // Función para manejar el cambio en la barra de búsqueda
  const handleSearchChange = (event) => {
    const value = event.target.value
    setSearchTerm(value)

    if (value) {
      const category =
        selectedOption === 'empleado'
          ? 'empleados'
          : selectedOption === 'plato'
          ? 'platos'
          : 'bebidas' // Asegúrate de que las claves sean 'platos' y 'bebidas' en el objeto data
      const filtered = data[category].filter((item) =>
        item.label.toLowerCase().includes(value.toLowerCase()),
      )
      setFilteredResults(filtered)
    } else {
      setFilteredResults([])
    }
  }

  // Función para seleccionar el item y cerrar los resultados de búsqueda
  const handleSelectItem = (item) => {
    setSearchTerm(item.label) // Esto pondrá el nombre del plato o bebida en el search bar.
    setFilteredResults([]) // Esto limpiará los resultados de búsqueda, cerrando la lista.
    // ... manejo de la queja
  }

  // Función para manejar la queja de un elemento seleccionado
  const handleQueja = (item) => {
    // Lógica para procesar la queja del elemento seleccionado
    console.log('Se ha seleccionado un elemento para la queja:', item)
    // Ejemplo: se podría establecer el estado de la queja aquí
    // setQueja({ ...queja, item: item.label });
  }

  // Función para renderizar la barra de búsqueda según el RadioButton seleccionado
  const renderSearchBar = () => {
    if (selectedOption) {
      return (
        <div className="search__element">
          <label className="search-label-queja">
            Buscar {selectedOption === 'empleado' ? 'empleado' : selectedOption}:
          </label>
          <input
            type="text"
            placeholder={`Buscar ${selectedOption}...`}
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input-queja"
          />
          {filteredResults.length > 0 && (
            <div className="search-results-queja">
              {filteredResults.map((item, index) => (
                <div
                  key={index}
                  className="search-item-queja"
                  onClick={() => handleSelectItem(item)}
                >
                  {item.label}
                </div>
              ))}
            </div>
          )}
        </div>
      )
    }
  }

  return (
    <div className="quejaProducto">
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
          <span>Queja de cuenta #</span> {numeroCuenta}
        </p>
        <p className="current-time">{currentTime.toLocaleTimeString()}</p>
      </div>

      <form className="queja__form">
        <Input //INFORMACIÓN DE NIT
          className="table__input"
          label="Ingresar NIT"
          type="text"
          name="table"
          id="table"
          placeholder="Introduce el NIT de la persona"
          isNumeric={true}
        />

        <div className="slider-group">
          <p className="slider-label">Clasificación:</p>
          <Slider min={1} max={5} value={sliderValue} onChange={handleSliderChange} step={1} />
        </div>

        {renderSearchBar()}

        <div className="radio-buttons-container">
          <RadioButton
            label="Empleado"
            name="quejaType"
            value="empleado"
            checked={selectedOption === 'empleado'}
            onChange={handleRadioChange}
          />
          <RadioButton
            label="Plato"
            name="quejaType"
            value="plato"
            checked={selectedOption === 'plato'}
            onChange={handleRadioChange}
          />
          <RadioButton
            label="Bebida"
            name="quejaType"
            value="bebida"
            checked={selectedOption === 'bebida'}
            onChange={handleRadioChange}
          />
        </div>
        <Input //INFORMACIÓN DE MOTIVO
          className="table__input"
          label="Ingresar motivo de queja"
          type="text"
          name="table"
          id="table"
          placeholder="Introduce el motivo de la queja"
          isNumeric={false}
        />
        <div className="button__queja">
          <Link to={'/verfactura'}>
            <Button text="Enviar queja" onClick={() => console.log('Ver pedido')} />
          </Link>
        </div>
      </form>

      <div className="footer_queja">
        <p className="page__message">Your Second Home, with a Feline Twist</p>
      </div>
    </div>
  )
}

const Queja = ({ action }) => {
  return <div>{action === 'queja' && <QuejaProducto />}</div>
}

export default Queja
