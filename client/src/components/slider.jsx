import React from 'react'
import './slider.css'

const Slider = ({ min, max, value, onChange, step }) => {
  return (
    <div className="slider-container">
      <span className="slider-number">{min}</span>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        step={step}
        className="slider"
      />
      <span className="slider-number">{max}</span>
    </div>
  )
}

export default Slider
