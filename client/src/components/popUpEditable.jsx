import React, { useState } from 'react';
import SelectInput from './selectInput';
import './popUpEditable.css';

const PopupEditable = ({ isOpen, closePopup, dishName, platoID }) => {
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState('');
  const API_BASE_URL = 'https://api-the-cozy-whisker.vercel.app';

  const sizeOptions = [
    { value: 'Pequeño', label: 'Pequeño' },
    { value: 'Mediano', label: 'Mediano' },
    { value: 'Grande', label: 'Grande' },
  ];

  if (!isOpen) return null;

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/food-measures`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          comida_nombre: dishName,
          tamaño: size,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const medidac_id = data.data[0]?.medidac_id || null;
      const mesa_id = localStorage.getItem('numTable');

      console.log({
        mesa_id_arg: mesa_id,
        platoB_id_arg: platoID,
        cantidad_arg: quantity,
        medidaC_id_arg: medidac_id,
        nota_arg: note,
      });

      // Second fetch request to create-order endpoint
      const orderResponse = await fetch(`${API_BASE_URL}/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mesa_id_arg: mesa_id, // replace with actual mesa_id
          platoB_id_arg: platoID,
          cantidad_arg: quantity,
          medidaC_id_arg: medidac_id,
          nota_arg: note,
        }),
      });

      if (!orderResponse.ok) {
        throw new Error(`HTTP error! status: ${orderResponse.status}`);
      }

      const orderData = await orderResponse.json();

      console.log(orderData);

      closePopup(); // Close the popup after sending the data
    } catch (error) {
      console.error('An error occurred while fetching the data.', error);
    }
  };

  const handleSelectedSize = (value) => {
    setSize(value);
  };

  const handleQuantity = (value) => {
    setQuantity(value);
  };

  const handleNote = (value) => {
    setNote(value);
  };

  return (
    <div className="popup-overlay">
      <div className="popup-container" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={closePopup}>
          X
        </button>
        <div className="popup-header">
          <h3>Nombre plato: {dishName}</h3>
        </div>
        <SelectInput
          label="Tamaño:"
          name="size"
          id="size-select"
          options={sizeOptions}
          value={size}
          onValueChange={handleSelectedSize}
        />
        <div className="input-group">
          <label htmlFor="quantity">Cantidad:</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            min="1"
            value={quantity}
            onChange={(e) => handleQuantity(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="note">Nota:</label>
          <textarea
            id="note"
            name="note"
            value={note}
            onChange={(e) => handleNote(e.target.value)}
          />
        </div>
        <button className="submit-button" onClick={handleSubmit}>
          PEDIR
        </button>
      </div>
    </div>
  );
};

export default PopupEditable;
