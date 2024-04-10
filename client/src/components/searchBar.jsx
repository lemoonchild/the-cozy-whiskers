import React from 'react'
import './searchBar.css'

const SearchBar = ({ value, onChange, results, onSelect, placeholder }) => {
  return (
    <div className="search-bar-container">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="search-input"
      />
      {results.length > 0 && (
        <ul className="results-list">
          {results.map((item) => (
            <li key={item.id} onClick={() => onSelect(item)}>
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SearchBar
