import React from 'react'
import './popUpfecha.css'

const PopupFecha = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <div className="popup-overlay-fecha" onClick={onClose}>
      <div className="popup-content-fecha" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close-fecha" onClick={onClose}>
          X
        </button>
        <div className="popup-content-inner">{children}</div>
      </div>
    </div>
  )
}

export default PopupFecha
