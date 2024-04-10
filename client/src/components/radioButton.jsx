import React from 'react'
import './radioButton.css'

const RadioButton = ({ label, name, value, checked, onChange }) => {
  return (
    <label className="radio-button-container">
      {label}
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="radio-button"
      />
      <span className="custom-radio-button"></span>
    </label>
  )
}

export default RadioButton
