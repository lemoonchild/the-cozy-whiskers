import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import './ordenMesero.css';
import Button from '../components/button';

import PopupEditable from '../components/popUpEditable';

const OrdenMesero = () => {
  const numeroMesa = localStorage.getItem('numTable');
  const API_BASE_URL = 'https://api-the-cozy-whisker.vercel.app';

  // Reloj
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Estado para manejar la entrada de búsqueda
  const [searchTerm, setSearchTerm] = useState('');

  // Estado para la lista filtrada de platos o bebidas
  const [filteredDishes, setFilteredDishes] = useState([]);

  // Lista simulada de platos o bebidas
  const [dishes, setDishes] = useState([]);

  // Fetch dishes from the server
  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/food-plates`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.status === 'success') {
          setDishes(data.data);
        } else {
          console.error('Failed to fetch dishes:', data.message);
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

    fetchDishes();
  }, []);

  //Busqueda
  const handleSearch = (event) => {
    const value = event.target.value;
    console.log('Valor de búsqueda:', value); // Debería mostrar la entrada del usuario
    setSearchTerm(value);
    if (value) {
      const filtered = dishes.filter((dish) =>
        dish.nombre.toLowerCase().includes(value.toLowerCase()),
      );
      console.log('Platos filtrados:', filtered); // Debería mostrar los platos o bebidas filtrados
      setFilteredDishes(filtered);
    } else {
      setFilteredDishes([]);
    }
  };

  // PopUp
  const [isPopupEditableOpen, setIsPopupEditableOpen] = useState(false);
  const [currentDishName, setCurrentDishName] = useState('');
  const [currentDishID, setCurrentDishID] = useState('');

  const openPopupEditable = (dishName, dishID) => {
    setCurrentDishName(dishName);
    setCurrentDishID(dishID);
    setIsPopupEditableOpen(true);
  };

  return (
    <div className="ordenMesero">
      <div className="header">
        <img src="/resources/mainlogo.png" alt="Logo" className="main__logo" />
        <div className="employee-info">
          <Link to={'/informacionFactura'}>
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
      <div className="search__food__orden">
        <label className="search-label">Buscar plato o bebida:</label>
        <input
          type="text"
          placeholder="Buscar plato o bebida"
          value={searchTerm}
          onChange={handleSearch}
          className="search-input-orden"
        />
        {searchTerm && (
          <div className="search-results-orden">
            {filteredDishes.map((dish) => (
              <div
                key={dish.nombre}
                className="search-item-orden"
                onClick={() => openPopupEditable(dish.nombre, dish.platobebida_id)}
              >
                {dish.nombre}
              </div>
            ))}
          </div>
        )}

        <PopupEditable
          isOpen={isPopupEditableOpen}
          closePopup={() => setIsPopupEditableOpen(false)}
          dishName={currentDishName}
          platoID={currentDishID}
        />
      </div>
      <div className="button__orden">
        <Link
          to={'/verPedidoMesero'} //Envía a página para ver pedidos del mesero
        >
          <Button text="Ver pedido" onClick={() => console.log('Ver pedido')} />
        </Link>
      </div>

      <div className="footer_orden">
        <p className="page__message">Your Second Home, with a Feline Twist</p>
      </div>
    </div>
  );
};

const OrdenMeseros = ({ action }) => {
  return <div>{action === 'ordenMesero' && <OrdenMesero />}</div>;
};

export default OrdenMeseros;
