import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/button'
import './factura.css'

const VerFactura = () => {
  //Información que viene de la pantalla de factura
  const nitUsuario = 656230 - 2
  const nombreUsuario = 'Alberto Castro'
  const direccion = 'Ciudad'

  //Información sobre el no. de factura, fecha de emisión y tipo de pago (que viene de pantalla factura)
  const noFactura = 12
  const fechaEmisión = '11/03/2024'
  const tipoPago = 'Efectivo'

  //Numero de personas a dividir la cuenta
  const numeroDePersonas = 3

  //Arreglo de productos de prueba para factura
  const productos = [
    { cantidad: 1, nombre: 'Producto A', precio: 10.99 },
    { cantidad: 2, nombre: 'Producto B', precio: 5.5 },
    { cantidad: 3, nombre: 'Producto C', precio: 11.99 },
    { cantidad: 5, nombre: 'Producto D', precio: 6.0 },
    { cantidad: 10, nombre: 'Producto E', precio: 12.98 },
    { cantidad: 12, nombre: 'Producto F', precio: 7.5 },
    // Añade aquí más productos según sea necesario
  ]

  // Función para calcular el total
  const calcularTotal = () => {
    return productos
      .reduce((total, producto) => total + producto.cantidad * producto.precio, 0)
      .toFixed(2)
  }

  const calcularTotalDividido = (personas) => {
    if (personas <= 0) {
      return 'Error: El número de personas debe ser mayor que 0'
    }

    const total = productos.reduce(
      (total, producto) => total + producto.cantidad * producto.precio,
      0,
    )

    return (total / personas).toFixed(2)
  }

  // Componente Producto
  function Producto({ cantidad, nombre, precio }) {
    return (
      <div className="productos__factura">
        <span>{cantidad}</span>
        <span>{nombre}</span>
        <span>${precio.toFixed(2)}</span>
      </div>
    )
  }
  return (
    <div className="ver__factura">
      <div className="header__factura">
        <p className="titulo__factura__main">
          <h3>FACTURA</h3>
        </p>

        <Link to={'/mesaMesero'}>
          <button className="close-button">X</button>
        </Link>
      </div>
      <img src="../resources/mainlogo.png" alt="Logo" className="main__logo__factura" />
      <div className="info__empresa">
        <p>The Cozy Whiskers S.A</p>
        <p>Nit: 456778-2</p>
        <p>6a. Avenida 8-28 zona 9</p>
      </div>
      <div className="info__usuario__factura">
        <h1 className="titulo__factura">FACTURA A:</h1>

        <p className="informacion__factura">
          <span>Nit:</span> {nitUsuario}
        </p>
        <p className="informacion__factura">
          <span>Nombre:</span> {nombreUsuario}
        </p>
        <p className="informacion__factura">
          <span>Direccion:</span> {direccion}
        </p>
      </div>
      <div className="info__factura">
        <h1 className="titulo__factura">INFORMACION:</h1>

        <p className="informacion__factura">
          <span>No. Factura:</span> {noFactura}
        </p>
        <p className="informacion__factura">
          <span>Fecha de emisión:</span> {fechaEmisión}
        </p>
        <p className="informacion__factura">
          <span>Tipo de pago:</span> {tipoPago}
        </p>
      </div>
      <div className="button__satisfaccion">
        <Link to={'/encuestaSatisfaccion'}>
          <Button text="Encuesta de Satisfaccion" onClick={() => console.log('Registrarse')} />
        </Link>
      </div>
      <div className="button__queja">
        <Link to={'/queja'}>
          <Button text="Queja" onClick={() => console.log('Registrarse')} />
        </Link>
      </div>
      <div className="factura_usuario">
        <p>Cantidad</p>
        <p>Producto</p>
        <p>Precio</p>
      </div>
      <div className="elementos__factura">
        {productos.map((producto, index) => (
          <Producto
            key={index}
            cantidad={producto.cantidad}
            nombre={producto.nombre}
            precio={producto.precio}
          />
        ))}
      </div>
      <div className="total__factura">
        <span>Total: ${calcularTotal()}</span>
      </div>

      <div className="total_cuenta_dividida">
        <span>Cantidad a pagar por cada persona: ${calcularTotalDividido(numeroDePersonas)}</span>
      </div>

      <div className="footer_queja">
        <p className="page__message">Your Second Home, with a Feline Twist</p>
      </div>
    </div>
  )
}

const VerFacturaUsuario = ({ action }) => {
  return <div>{action === 'verfactura' && <VerFactura />}</div>
}

export default VerFacturaUsuario
