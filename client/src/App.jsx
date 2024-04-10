import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from '../src/pages/homePage'
import LoginRegistro from '../src/pages/loginRegister'
import CocineroBarista from '../src/pages/cocineroBarista'
import MesaMesero from './pages/mesaMesero'
import OrdenMesero from './pages/ordenMesero'
import VerPedidosMesero from './pages/verPedidoMesero'
import InformaciondeFactura from './pages/infoFactura'
import EncuestaSatisfaccion from './pages/encuestaSatisfaccion'
import Queja from './pages/queja'
import Reportes from './pages/reportes'
import VerFacturaUsuario from './pages/factura'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginRegistro action="login" />} />
        <Route path="/register" element={<LoginRegistro action="register" />} />
        <Route path="/cocinero" element={<CocineroBarista action="cocinero" />} />
        <Route path="/barista" element={<CocineroBarista action="barista" />} />
        <Route path="/mesaMesero" element={<MesaMesero action="mesaMesero" />} />
        <Route path="/ordenMesero" element={<OrdenMesero action="ordenMesero" />} />
        <Route path="/verPedidoMesero" element={<VerPedidosMesero action="verPedidoMesero" />} />
        <Route
          path="/encuestaSatisfaccion"
          element={<EncuestaSatisfaccion action="encuestaSatisfaccion" />}
        />
        <Route path="/queja" element={<Queja action="queja" />} />
        <Route path="/verfactura" element={<VerFacturaUsuario action="verfactura" />} />
        <Route
          path="/informacionFactura"
          element={<InformaciondeFactura action="informacionFactura" />}
        />
        <Route path="/reportes" element={<Reportes action="reportes" />} />
      </Routes>
    </Router>
  )
}
export default App
