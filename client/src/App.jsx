import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from '../src/pages/homePage'
import LoginRegistro from '../src/pages/loginRegister'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginRegistro action="login" />} />
        <Route path="/register" element={<LoginRegistro action="register" />} />
      </Routes>
    </Router>
  )
}
export default App
