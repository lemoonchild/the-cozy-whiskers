import React from 'react';
import './selectInput.css';

const SelectInput = ({ label, name, id, options, size, onValueChange }) => {
  const handleChange = (e) => {
    // Llama a la función prop con el nuevo valor
    if (onValueChange) {
      onValueChange(e.target.value);
    }
  };

  return (
    <div className="input-group">
      {label && <label htmlFor={id}>{label}</label>}
      <select name={name} id={id} size={size || 1} onChange={handleChange}>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectInput;
