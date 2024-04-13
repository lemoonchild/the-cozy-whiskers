import React from 'react'
import './input.css'

const Input = ({ label, type, name, id, placeholder, className, isNumeric, onValueChange }) => {
  const handleInputChange = (e) => {
    let inputValue = e.target.value;

    if (isNumeric) {
      inputValue = inputValue.replace(/\D/g, '');
    }

    if (onValueChange) {
      onValueChange(inputValue);
    }
  };

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
