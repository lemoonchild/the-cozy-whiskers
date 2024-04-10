import React from 'react'
import './selectInput.css'

const SelectInput = ({ label, name, id, options, size }) => {
  return (
    <div className="input-group">
      {label && <label htmlFor={id}>{label}</label>}
      <select name={name} id={id} size={size || 1}>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default SelectInput
