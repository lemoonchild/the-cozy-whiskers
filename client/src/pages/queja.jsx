import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import './queja.css'
import Button from '../components/button'
import Input from '../components/input'
import Slider from '../components/slider'
import RadioButton from '../components/radioButton'

const QuejaProducto = () => {
  const API_BASE_URL = 'http://localhost:5001'
  //Colocar el nombre de empleado y rol según el usuario
  const [empleadoNombre, setEmpleadoNombre] = useState('')
  const [rolEmpleado, setRolEmpleado] = useState('')
  const [NITValue, setNITValue] = useState('') // Estado para el NIT
  const [queja, setQueja] = useState('') // Estado para el NIT
  const [sliderValue, setSliderValue] = useState(3)
  const [selectedEmpleadoId, setSelectedEmpleadoId] = useState(0);
  const [selectedPlatoBebidaId, setSelectedPlatoBebidaId] = useState(0);


  const handleSubmitQueja = () => {
    localStorage.setItem('NIT', NITValue)
    localStorage.setItem('queja', queja)
    localStorage.setItem('clasificacion', sliderValue)
    localStorage.setItem('empleado_id', selectedEmpleadoId)
    localStorage.setItem('platobebida_id', selectedPlatoBebidaId)
  }

  // Handlers para cada slider
  const handleSliderChange = (e) => {
    setSliderValue(e.target.value)
  }

  const handleNITChange = (value) => {
    setNITValue(value)
  }

  const handleQuejaChange = (value) => {
    setQueja(value)
  }

  useEffect(() => {
    const fetchRoleName = async () => {
      const username = localStorage.getItem('userLocal');
      const password = localStorage.getItem('passwordLocal');

      try {
        const response = await fetch(`${API_BASE_URL}/get-role-name`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.status === 'success') {
          setEmpleadoNombre(data.data.nombre);
          setRolEmpleado(data.data.rol);
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

    fetchRoleName();
  }, []);
  //Numero de mesa
  const numeroCuenta = localStorage.getItem('numTable')

  //Slider

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
  const [employees, setEmployees] = useState([]);
  const [food, setFood] = useState([]);
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let response;
      let data;

      try {
        if (selectedOption === 'Empleado') {
          response = await fetch(`${API_BASE_URL}/list-employees`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          });
        } else if (selectedOption === 'Plato' || selectedOption === 'Bebida') {
          response = await fetch(`${API_BASE_URL}/food-by-type`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: selectedOption }),
          });
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        data = await response.json();

        if (data.status === 'success') {
          if (selectedOption === 'Empleado') {
            setEmployees(data.data);
          } else if (selectedOption === 'Plato') {
            setFood(data.data);
          } else if (selectedOption === 'Bebida') {
            setDrinks(data.data);
          }
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

    if (selectedOption) {
      fetchData();
    }
  }, [selectedOption]);

  // Estado para manejar la entrada de búsqueda y los resultados filtrados
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredResults, setFilteredResults] = useState([])

  // Función para manejar el cambio en la barra de búsqueda
  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value) {
      let filtered = [];
      if (selectedOption === 'Empleado') {
        filtered = employees.filter(item => item.nombre.toLowerCase().includes(value.toLowerCase()));
      } else if (selectedOption === 'Plato') {
        filtered = food.filter(item => item.nombre.toLowerCase().includes(value.toLowerCase()));
      } else if (selectedOption === 'Bebida') {
        filtered = drinks.filter(item => item.nombre.toLowerCase().includes(value.toLowerCase()));
      }
      setFilteredResults(filtered);
    } else {
      setFilteredResults([]);
    }
  };

  // Función para seleccionar el item y cerrar los resultados de búsqueda
  const handleSelectItem = (item) => {
    setSearchTerm(item.nombre) // Esto pondrá el nombre del plato o bebida en el search bar.
    setFilteredResults([]) // Esto limpiará los resultados de búsqueda, cerrando la lista.

    if (selectedOption === 'Empleado') {
      setSelectedEmpleadoId(item.empleado_id);
      setSelectedPlatoBebidaId(0);
    } else if (selectedOption === 'Plato' || selectedOption === 'Bebida') {
      setSelectedPlatoBebidaId(item.platobebida_id);
      setSelectedEmpleadoId(0);
    }

  }

  // Función para renderizar la barra de búsqueda según el RadioButton seleccionado
  const renderSearchBar = () => {
    if (selectedOption) {
      return (
        <div className="search__element">
          <label className="search-label-queja">
            Buscar {selectedOption.toLowerCase()}:
          </label>
          <input
            type="text"
            placeholder={`Buscar ${selectedOption.toLowerCase()}...`}
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
                  {item.nombre}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }
  };

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
          onValueChange={handleNITChange}
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
            value="Empleado"
            checked={selectedOption === 'Empleado'}
            onChange={handleRadioChange}
          />
          <RadioButton
            label="Plato"
            name="quejaType"
            value="Plato"
            checked={selectedOption === 'Plato'}
            onChange={handleRadioChange}
          />
          <RadioButton
            label="Bebida"
            name="quejaType"
            value="Bebida"
            checked={selectedOption === 'Bebida'}
            onChange={handleRadioChange}
          />
        </div>
        <Input //INFORMACIÓN DE MOTIVO
          className="table__input"
          label="Ingresar motivo de queja"
          type="text"
          name="table"
          id="table"
          onValueChange={handleQuejaChange}
          placeholder="Introduce el motivo de la queja"
          isNumeric={false}
        />
        <div className="button__queja">
          <Link to={'/verfactura'}>
            <Button text="Enviar queja" onClick={handleSubmitQueja} />
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
