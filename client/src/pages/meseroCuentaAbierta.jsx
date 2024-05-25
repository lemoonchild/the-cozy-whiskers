import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './meseroCuentaAbierta.css';
import Input from '../components/input';
import Button from '../components/button';
import SelectInput from '../components/selectInput';

const API_BASE_URL = 'https://the-cozy-whiskers-api-vercel.vercel.app';

const MesaCuentaAbierta = () => {
  const [empleadoNombre, setEmpleadoNombre] = useState('');
  const [rolEmpleado, setRolEmpleado] = useState('');

  const navigate = useNavigate();

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

  // Reloj
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  //Busqueda de mesa
  // Estado para la mesa seleccionada
  const [selectedTable, setSelectedTable] = useState('');

  const [occupiedTablesOptions, setOccupiedTablesOptions] = useState([]);
  const handleSelectedTable = (value) => {
    setSelectedTable(value);
  };

  // Opciones de mesas disponibles para el select
  useEffect(() => {
    const fetchAvailableTables = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/get-occupied-mesas`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.status === 'success') {
          const tablesOptions = data.data.map((table) => ({
            label: `Mesa ${table.mesa_id}`,
            value: table.mesa_id,
          }));

          setOccupiedTablesOptions(tablesOptions);
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

    fetchAvailableTables();

    const interval = setInterval(fetchAvailableTables, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mesaMesero__abierta">
      <div className="header">
        <img src="/resources/mainlogo.png" alt="Logo" className="main__logo" />
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
        <p className="main__title">Buscar una mesa existente</p>
        <p className="current-time">{currentTime.toLocaleTimeString()}</p>
      </div>

      <form className="table__form__abierto">
        <SelectInput
          label="Seleccionar mesa:"
          name="table"
          id="table-select"
          options={occupiedTablesOptions}
          onValueChange={handleSelectedTable}
          size="4"
        />

        <div className="mesa__button__container">
          <Button
            text="Crear nuevo pedido" //Opción de abrir cuenta
            onClick={() => {
              if (selectedTable) {
                localStorage.setItem('numTable', selectedTable);
                navigate('/ordenMesero');
              } else {
                alert('Please select a table.');
              }
            }}
          />
        </div>
      </form>

      <div className="footer_mesa__abierto">
        <p className="page__message">Your Second Home, with a Feline Twist</p>
      </div>
    </div>
  );
};

const MesaMeseroCuentaAbierta = ({ action }) => {
  return <div>{action === 'mesaMeseroCuentaAbierta' && <MesaCuentaAbierta />}</div>;
};

export default MesaMeseroCuentaAbierta;
