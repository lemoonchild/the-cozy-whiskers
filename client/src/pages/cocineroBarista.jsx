import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './cocineroBarista.css';
import Card from '../components/card';
import Popup from '../components/popUp';
import Button from '../components/button';

const Cocinero = () => {
  const navigate = useNavigate();
  const [empleadoNombre, setEmpleadoNombre] = useState('');
  const [rolEmpleado, setRolEmpleado] = useState('');
  const [completedDishes, setCompletedDishes] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);

  useEffect(() => {
    const fetchRoleName = async () => {
      const API_BASE_URL = 'https://the-cozy-whiskers-api-vercel.vercel.app';
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

  const API_BASE_URL = 'https://the-cozy-whiskers-api-vercel.vercel.app';

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch(`${API_BASE_URL}/fetch-all-orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tipo_comida: 'Plato' }),
      });
      const data = await response.json();
      if (data.data) {
        const filteredDishes = data.data.filter(
          (dish) => !completedDishes.includes(dish.detalle_id),
        );
        setDishes(filteredDishes);
      }
    };

    fetchOrders();
    const intervalId = setInterval(fetchOrders, 3000);
    return () => clearInterval(intervalId);
  }, [completedDishes]);

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

  const handlePrepareClick = (dish) => {
    setSelectedDish(dish);
    setPopupOpen(true);
  };

  const removeDish = (dishId) => {
    setCompletedDishes((prev) => [...prev, dishId]);
    setPopupOpen(false);
  };

  return (
    <div className="cocinero">
      <div className="header">
        <img src="../../public/resources/mainlogo.png" alt="Logo" className="main__logo" />
        <div className="employee-info">
          <p className="name__empleado">
            <span>Empleado:</span> {empleadoNombre}
          </p>
          <p className="rol__empleado">
            <span>Rol:</span> {rolEmpleado}
          </p>
        </div>
        <div className="button__satisfaccion_cocinero">
          <Button
            text="Cerrar Sesión"
            onClick={() => {
              navigate('/');
            }}
          />
        </div>
      </div>
      <div className="header-title">
        <p className="main__title">Pedidos</p>
        <p className="current-time">{currentTime.toLocaleTimeString()}</p>
      </div>
      <div className="cocinero-layout" ref={layoutRef}>
        {rolEmpleado === 'Cocinero' ? (
          <>
            {dishes.map((dish) => {
              const date = new Date(dish.fecha_ordenado);
              const formattedTime = date.toLocaleTimeString('en-US');

              return (
                <Card
                  key={dish.detalle_id}
                  image={dish.imagenlink}
                  time={formattedTime}
                  title={dish.nombre_comida}
                  onPrepareClick={() => handlePrepareClick(dish)}
                  buttonText="Ver Detalle"
                />
              );
            })}
          </>
        ) : (
          <div className="unauthorized">Usuario con rol no autorizado</div>
        )}
      </div>

      <div className="footer_cb">
        <p className="page__message">Your Second Home, with a Feline Twist</p>
      </div>

      <Popup
        isOpen={isPopupOpen}
        closePopup={() => setPopupOpen(false)}
        imageSrc={selectedDish?.imagenlink}
        title={`Preparando: ${selectedDish?.nombre_comida}`}
        size={selectedDish?.descripcion_medida}
        quantity={selectedDish?.cantidad}
        note={selectedDish?.nota}
        onRealizado={() => removeDish(selectedDish?.detalle_id)}
      ></Popup>
    </div>
  );
};

const Barista = () => {
  const navigate = useNavigate();
  const [empleadoNombre, setEmpleadoNombre] = useState('');
  const [rolEmpleado, setRolEmpleado] = useState('');
  const [completedDishes, setCompletedDishes] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);

  useEffect(() => {
    const fetchRoleName = async () => {
      const API_BASE_URL = 'https://the-cozy-whiskers-api-vercel.vercel.app';
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

  const API_BASE_URL = 'https://the-cozy-whiskers-api-vercel.vercel.app';

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch(`${API_BASE_URL}/fetch-all-orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tipo_comida: 'Bebida' }),
      });
      const data = await response.json();
      if (data.data) {
        const filteredDishes = data.data.filter(
          (dish) => !completedDishes.includes(dish.detalle_id),
        );
        setDishes(filteredDishes);
      }
    };

    fetchOrders();
    const intervalId = setInterval(fetchOrders, 3000);
    return () => clearInterval(intervalId);
  }, [completedDishes]);

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

  const handlePrepareClick = (dish) => {
    setSelectedDish(dish);
    setPopupOpen(true);
  };

  const removeDish = (dishId) => {
    setCompletedDishes((prev) => [...prev, dishId]);
    setPopupOpen(false);
  };

  return (
    <div className="cocinero">
      <div className="header">
        <img src="../../public/resources/mainlogo.png" alt="Logo" className="main__logo" />
        <div className="employee-info">
          <p className="name__empleado">
            <span>Empleado:</span> {empleadoNombre}
          </p>
          <p className="rol__empleado">
            <span>Rol:</span> {rolEmpleado}
          </p>
        </div>
        <div className="button__satisfaccion_cocinero">
          <Button
            text="Cerrar Sesión"
            onClick={() => {
              navigate('/');
            }}
          />
        </div>
      </div>
      <div className="header-title">
        <p className="main__title">Pedidos</p>
        <p className="current-time">{currentTime.toLocaleTimeString()}</p>
      </div>
      <div className="cocinero-layout" ref={layoutRef}>
        {rolEmpleado === 'Barista' ? (
          <>
            {dishes.map((dish) => {
              const date = new Date(dish.fecha_ordenado);
              const formattedTime = date.toLocaleTimeString('en-US');

              return (
                <Card
                  key={dish.detalle_id}
                  image={dish.imagenlink}
                  time={formattedTime}
                  title={dish.nombre_comida}
                  onPrepareClick={() => handlePrepareClick(dish)}
                  buttonText="Ver Detalle"
                />
              );
            })}
          </>
        ) : (
          <div className="unauthorized">Usuario con rol no autorizado</div>
        )}
      </div>

      <div className="footer_cb">
        <p className="page__message">Your Second Home, with a Feline Twist</p>
      </div>

      <Popup
        isOpen={isPopupOpen}
        closePopup={() => setPopupOpen(false)}
        imageSrc={selectedDish?.imagenlink}
        title={`Preparando: ${selectedDish?.nombre_comida}`}
        size={selectedDish?.descripcion_medida}
        quantity={selectedDish?.cantidad}
        note={selectedDish?.nota}
        onRealizado={() => removeDish(selectedDish?.detalle_id)}
      ></Popup>
    </div>
  );
};

//Cambia entre las funciones según si es cocinero o barista
const CocineroBarista = ({ action }) => {
  return (
    <div>
      {action === 'cocinero' && <Cocinero />}
      {action === 'barista' && <Barista />}
    </div>
  );
};

export default CocineroBarista;
