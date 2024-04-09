import React, { useState } from 'react'
import SelectInput from './selectInput'
import './popUpEditable.css'

const PopupEditable = ({ isOpen, closePopup, dishName }) => {
  const [size, setSize] = useState('mediano')
  const [quantity, setQuantity] = useState(1)
  const [note, setNote] = useState('')

  const sizeOptions = [
    { value: 'pequeno', label: 'Pequeño' },
    { value: 'mediano', label: 'Mediano' },
    { value: 'grande', label: 'Grande' },
  ]

  if (!isOpen) return null

  const handleSubmit = () => {
    // Aquí se gestionaría el envío de la información, como actualizar el estado
    console.log({ dishName, size, quantity, note })
    closePopup() // Cierra el popup después de enviar los datos
  }

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
          onChange={(e) => setSize(e.target.value)}
        />
        <div className="input-group">
          <label htmlFor="quantity">Cantidad:</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="note">Nota:</label>
          <textarea id="note" name="note" value={note} onChange={(e) => setNote(e.target.value)} />
        </div>
        <button className="submit-button" onClick={handleSubmit}>
          PEDIR
        </button>
      </div>
    </div>
  )
}

export default PopupEditable
