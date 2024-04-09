import React from 'react'
import './popUp.css'

const Popup = ({ isOpen, closePopup, imageSrc, title, size, quantity, note, onRealizado }) => {
  if (!isOpen) return null

  return (
    <div className="popup-overlay" onClick={closePopup}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <div className="popup-image-container">
          <img src={imageSrc} alt="Dish" className="popup-image" />
        </div>
        <div className="popup-text-container">
          <h2>{title}</h2>
          <p>Tamaño: {size}</p>
          <p>Cantidad: {quantity}</p>
          <p>Nota: {note}</p>
        </div>
        <button className="realizado-button" onClick={onRealizado}>
          Realizado
        </button>
        <button className="close-button" onClick={closePopup}>
          X
        </button>
      </div>
    </div>
  )
}

export default Popup
