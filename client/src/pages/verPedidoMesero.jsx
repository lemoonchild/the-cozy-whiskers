import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './verPedidoMesero.css';
import Card from '../components/card';
import Popup from '../components/popUp';
import Button from '../components/button';

const VerPedidoMesero = () => {
  const API_BASE_URL = 'https://the-cozy-whiskers-api-vercel.vercel.app';
  const numeroMesa = localStorage.getItem('numTable');

  const [dishes, setDishes] = useState([]);

  const fetchDishName = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/food-by-id`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      return data.data[0].nombre;
    } catch (error) {
      console.error('An error occurred while fetching the dish name.', error);
    }
  };

  const fetchDishes = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/detalle-pedido`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mesa_id: numeroMesa,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const dishesWithNames = await Promise.all(
        data.data.map(async (dish) => {
          const name = await fetchDishName(dish.platob_id);
          return { ...dish, title: name };
        }),
      );

      setDishes(dishesWithNames);
    } catch (error) {
      console.error('An error occurred while fetching the data.', error);
    }
  };

  useEffect(() => {
    fetchDishes(); // Fetch dishes when the component mounts
  }, []);

  //Actualizar la pagina cada 3 segundos
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchDishes(); // Fetch dishes every 3 seconds
    }, 5000); // Se ejecuta cada 3 segundos

    // Función de limpieza que React ejecutará cuando el componente se desmonte
    return () => clearInterval(intervalId);
  }, []); // Las dependencias vacías indican que solo se ejecuta al montar y desmontar

  // Reloj
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  //Cartas

  const layoutRef = useRef();

  useEffect(() => {
    // Cada vez que se actualiza la lista de platos, se desplaza al final
    if (layoutRef.current) {
      // Desplaza al final del contenedor
      layoutRef.current.scrollLeft = layoutRef.current.scrollWidth;
    }
  }, [dishes.length]);

  //PopUp de información de la carta
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);

  const handlePrepareClick = (dish) => {
    setSelectedDish(dish);
    setPopupOpen(true);
  };

  return (
    <div className="pedido">
      <div className="header">
        <img src="/resources/mainlogo.png" alt="Logo" className="main__logo" />
        <div className="employee-info">
          <Link to={'/mesaMesero'}>
            <Button
              text="Confirmar Pedido"
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
      <div className="pedido-layout" ref={layoutRef}>
        <div className="cards-container">
          {dishes.map((dish) => {
            const date = new Date(dish.fecha_ordenado);
            const formattedTime = date.toLocaleTimeString('en-US');

            return (
              <Card
                key={dish.detalle_id}
                image={dish.imagenlink}
                time={formattedTime}
                title={dish.title}
                onPrepareClick={() => handlePrepareClick(dish)}
                buttonText="Ver Detalle"
              />
            );
          })}
        </div>
      </div>

      <div className="footer_mesero">
        <p className="page__message">Your Second Home, with a Feline Twist</p>
      </div>

      <Popup
        isOpen={isPopupOpen}
        closePopup={() => setPopupOpen(false)}
        imageSrc={selectedDish?.imagenlink}
        title={`Preparando: ${selectedDish?.title}`}
        size={selectedDish?.medidadescripcion}
        quantity={selectedDish?.cantidad}
        note={selectedDish?.nota}
        onRealizado={() => setPopupOpen(false)}
      ></Popup>
    </div>
  );
};
const VerPedidosMesero = ({ action }) => {
  return <div>{action === 'verPedidoMesero' && <VerPedidoMesero />}</div>;
};

export default VerPedidosMesero;
