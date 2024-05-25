import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './mesaMesero.css';
import Input from '../components/input';
import Button from '../components/button';
import SelectInput from '../components/selectInput';

const API_BASE_URL = 'https://the-cozy-whiskers-api-vercel.vercel.app';

const MeseroMesa = () => {
  const navigate = useNavigate();
  const [empleadoNombre, setEmpleadoNombre] = useState('');
  const [rolEmpleado, setRolEmpleado] = useState('');

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

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const [selectedTable, setSelectedTable] = useState('');
  const handleSelectedTable = (value) => {
    setSelectedTable(value);
  };
  const [availableTablesOptions, setAvailableTablesOptions] = useState([]);
  const [numPeople, setNumPeople] = useState('');

  const handlePeople = (value) => {
    setNumPeople(value);
  };

  useEffect(() => {
    const fetchAvailableTables = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/get-available-mesas`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.status === 'success') {
          const tablesOptions = data.data.map((table) => ({
            label: `Mesa ${table.mesa_id}`,
            value: table.mesa_id,
          }));

          setAvailableTablesOptions(tablesOptions);
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
    <div className="mesaMesero">
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
        <div className="button__satisfaccion_mesaMesero">
          <Button text="Cerrar Sesión" onClick={() => navigate('/login')} />
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
          onValueChange={handleSelectedTable}
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
          onValueChange={handlePeople}
        />
      </form>

      <div className="buttons_mesa">
        <Button
          text="Abrir cuenta" //Opción de abrir cuenta
          onClick={async () => {
            try {
              const response = await fetch(
                'https://the-cozy-whiskers-api-vercel.vercel.app/insert-new-cuenta',
                {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    mesa_id_arg: selectedTable,
                    personas_arg: numPeople,
                  }),
                },
              );

              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }

              const data = await response.json();

              if (data.status === 'success') {
                localStorage.setItem('numTable', selectedTable);
                navigate('/ordenMesero');
              } else {
                alert(data.message);
              }
            } catch (error) {
              console.error('An error occurred:', error);
            }
          }}
        />

        <Button
          text="Buscar cuenta existente" //Opción de buscar cuenta existente
          onClick={() => navigate('/mesaCuentaAbierta')}
        />
      </div>

      <div className="footer_mesa">
        <p className="page__message">Your Second Home, with a Feline Twist</p>
      </div>
    </div>
  );
};

const MesaMesero = ({ action }) => {
  return <div>{action === 'mesaMesero' && <MeseroMesa />}</div>;
};

export default MesaMesero;
