import React from 'react'
import './card.css'

const Card = ({ image, time, title, onPrepareClick }) => {
  return (
    <div className="card">
      <img src={image} alt={title} className="card-image" />
      <div className="card-info">
        <span className="card-time">{time}</span>
        <h3 className="card-title">{title}</h3>
      </div>
      <button className="card-button" onClick={onPrepareClick}>
        PREPARAR
      </button>
    </div>
  )
}

export default Card
