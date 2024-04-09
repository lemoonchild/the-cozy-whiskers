import React from 'react'
import './input.css'

const Input = ({ label, type, name, id, placeholder, className, isNumeric }) => {
  const handleInputChange = (e) => {
    if (isNumeric) {
      const value = e.target.value.replace(/\D/g, '')
      e.target.value = value
    }
  }

  return (
    <div className={`input-group ${className}`}>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        type={isNumeric ? 'text' : type}
        name={name}
        id={id}
        placeholder={placeholder}
        onChange={handleInputChange}
      />
    </div>
  )
}

export default Input
