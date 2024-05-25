import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './encuestaSatisfaccion.css';
import Input from '../components/input';
import Button from '../components/button';
import Slider from '../components/slider';

const EncuestaSatisfaccion = () => {
  const API_BASE_URL = 'https://the-cozy-whiskers-api-vercel.vercel.app';
  //Colocar el nombre de empleado y rol según el usuario
  const [empleadoNombre, setEmpleadoNombre] = useState('');
  const [rolEmpleado, setRolEmpleado] = useState('');
  const [empleadoIDSat, setEmpleadoIDSat] = useState('');
  const numeroCuenta = localStorage.getItem('numTable');
  const NITQueja = localStorage.getItem('NIT');
  const queja = localStorage.getItem('queja');
  const clasificacion = localStorage.getItem('clasificacion');
  const selectedEmpleadoId = localStorage.getItem('empleado_id');
  const selectedPlatoBebidaId = localStorage.getItem('platobebida_id');

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
          setEmpleadoIDSat(data.data.empleado_id);
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

    fetchRoleName();
  }, []);

  //Sliders de preguntas
  const [sliderValue1, setSliderValue1] = useState(3); //default de 3
  const [sliderValue2, setSliderValue2] = useState(3);

  // Handlers para cada slider
  const handleSliderChange1 = (e) => {
    setSliderValue1(e.target.value);
  };
  const handleSliderChange2 = (e) => {
    setSliderValue2(e.target.value);
  };

  //Envio de la encuesta con boton
  const handleSubmit = async () => {
    console.log(empleadoIDSat);
    try {
      const response = await fetch(`${API_BASE_URL}/submit-queja-encuesta`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nit_arg: NITQueja,
          empleado_id_arg: selectedEmpleadoId,
          empleado_id_arg_sat: empleadoIDSat,
          platoBebida_id_arg: selectedPlatoBebidaId,
          motivo_arg: queja,
          clasificacion_arg: clasificacion,
          amabilidad_arg: sliderValue1,
          exactitud_arg: sliderValue2,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.status === 'success') {
        alert(data.message);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  // Reloj
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="informacionFactura">
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
          value={NITQueja}
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
  );
};

const EncuestaSatisfaccionMesero = ({ action }) => {
  return <div>{action === 'encuestaSatisfaccion' && <EncuestaSatisfaccion />}</div>;
};

export default EncuestaSatisfaccionMesero;
