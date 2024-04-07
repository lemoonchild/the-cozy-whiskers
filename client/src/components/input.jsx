import React from 'react'
import './input.css'

const Input = ({ label, type, name, id, placeholder, className }) => {
  return (
    <div className={`input-group ${className}`}>
      {label && <label htmlFor={id}>{label}</label>}
      <input type={type} name={name} id={id} placeholder={placeholder} />
    </div>
  )
}

export default Input
