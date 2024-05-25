import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import './infoFactura.css';
import Input from '../components/input';
import Button from '../components/button';

import SelectInput from '../components/selectInput';

const InformacionFactura = () => {
  //Colocar el nombre de empleado y rol según el usuario
  const [empleadoNombre, setEmpleadoNombre] = useState('');
  const [rolEmpleado, setRolEmpleado] = useState('');
  const API_BASE_URL = 'https://the-cozy-whiskers-api-vercel.vercel.app';

  const MesaId = localStorage.getItem('numTable');

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

  //checkbox
  const [isDividedBill, setIsDividedBill] = useState(false); // Estado para el checkbox
  const [NITValue, setNITValue] = useState(''); // Estado para el NIT
  const [nombreValue, setNombreValue] = useState(''); // Estado para el nombre
  const [direccionValue, setDireccionValue] = useState(''); // Estado para la dirección
  const [selectedPaymentOption, setSelectedPaymentOption] = useState('efectivo');

  const handlePaymentOptionChange = (value) => {
    setSelectedPaymentOption(value);
  };

  const checkEfectivo = selectedPaymentOption === 'efectivo' || selectedPaymentOption === 'ambos';
  const checkTarjeta = selectedPaymentOption === 'tarjeta' || selectedPaymentOption === 'ambos';

  const handleCheckboxChange = (e) => {
    setIsDividedBill(e.target.checked); // Actualiza el estado cuando el checkbox cambia
  };

  const handleNITChange = (value) => {
    setNITValue(value);
  };

  const handleNombreChange = (value) => {
    setNombreValue(value);
  };

  const handleDireccionChange = (value) => {
    setDireccionValue(value);
  };

  //Opciones de pago
  const payOptions = [
    { value: 'efectivo', label: 'Efectivo' },
    { value: 'tarjeta', label: 'Tarjeta' },
    { value: 'ambos', label: 'Ambos' },
  ];

  const handlePrintFacturaClick = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/close-cuenta`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mesa_id_arg: MesaId,
          nit_arg: NITValue,
          dir_arg: direccionValue,
          nombre_arg: nombreValue,
          efectivo_arg: checkEfectivo,
          tarjeta_arg: checkTarjeta,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.status === 'success') {
        console.log('Factura printed successfully');
        localStorage.setItem('dividedBill', isDividedBill);
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
        <p className="main__title">
          {' '}
          <span>Informacion de factura para mesa #</span> {MesaId}
        </p>
        <p className="current-time">{currentTime.toLocaleTimeString()}</p>
      </div>

      <form className="factura__form">
        <div className="factura__column1">
          <div className="facturainput">
            <Input //INFORMACIÓN NIT
              className="table__input"
              label="Ingrese el NIT:"
              type="text"
              name="table"
              id="table"
              placeholder="Introduce el NIT"
              onValueChange={handleNITChange}
              isNumeric={true}
            />
          </div>
          <div className="facturainput">
            <Input //INFORMACIÓN NOMBRE
              className="table__input"
              label="Ingrese el nombre:"
              type="text"
              name="table"
              id="table"
              onValueChange={handleNombreChange}
              placeholder="Introduce el nombre"
              isNumeric={false}
            />
          </div>
        </div>
        <div className="factura__column2">
          <div className="facturainput">
            <Input //INFORMACIÓN DE DIRECCION
              className="table__input"
              label="Ingrese la direccion:"
              type="text"
              name="table"
              id="table"
              onValueChange={handleDireccionChange}
              placeholder="Introduce la direccion"
              isNumeric={false}
            />
          </div>
          <div className="facturainput">
            <SelectInput
              className="table__input"
              label="Tipo de pago:"
              name="role"
              id="role"
              options={payOptions}
              onValueChange={handlePaymentOptionChange}
            />
          </div>
        </div>
        <div className="checkbox-container">
          <label className="checkbox-label">
            <input type="checkbox" checked={isDividedBill} onChange={handleCheckboxChange} />
            ¿Necesita la cuenta dividida?
          </label>
        </div>
        <div className="factura__button-container">
          <Link to={'/verfactura'}>
            <Button text="Imprimir factura" onClick={handlePrintFacturaClick} />
          </Link>
        </div>
      </form>

      <div className="footer_factura">
        <p className="page__message">Your Second Home, with a Feline Twist</p>
      </div>
    </div>
  );
};

const InformaciondeFactura = ({ action }) => {
  return <div>{action === 'informacionFactura' && <InformacionFactura />}</div>;
};

export default InformaciondeFactura;
