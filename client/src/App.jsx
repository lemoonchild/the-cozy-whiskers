import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from '../src/pages/homePage'
import LoginRegistro from '../src/pages/loginRegister'
import CocineroBarista from '../src/pages/cocineroBarista'
import MesaOrdenMesero from '../src/pages/mesaOrdenMesero'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginRegistro action="login" />} />
        <Route path="/register" element={<LoginRegistro action="register" />} />
        <Route path="/cocinero" element={<CocineroBarista action="cocinero" />} />
        <Route path="/barista" element={<CocineroBarista action="barista" />} />
        <Route path="/mesaMesero" element={<MesaOrdenMesero action="mesaMesero" />} />
        <Route path="/ordenMesero" element={<MesaOrdenMesero action="ordenMesero" />} />
      </Routes>
    </Router>
  )
}
export default App
