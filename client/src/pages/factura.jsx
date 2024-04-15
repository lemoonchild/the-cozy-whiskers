import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/button'
import './factura.css'

const VerFactura = () => {
  const API_BASE_URL = 'https://the-cozy-whiskers-api-vercel.vercel.app'
  //Información que viene de la pantalla de factura
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [totalData, setTotalData] = useState("");
  const [nitUsuario, setNitUsuario] = useState("");
  const [direccion, setDireccion] = useState("");
  const [noFactura, setNoFactura] = useState("");
  const [fechaEmision, setFechaEmision] = useState(new Date().toLocaleDateString());
  const [tipoPago, setTipoPago] = useState("");
  const [numeroDePersonas, setNumeroDePersonas] = useState(3);
  const MesaId = localStorage.getItem('numTable')
  const dividedBill = localStorage.getItem('dividedBill')

  const [dividedTotal, setDividedTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/last-invoice`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            mesa_id: MesaId,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        setNitUsuario(data.data.nit);
        setNombreUsuario(data.data.nombre);
        setDireccion(data.data.direccion);
        setNoFactura(data.data.factura_id);
        setFechaEmision(new Date(data.data.fecha_emision).toLocaleDateString());
        setNumeroDePersonas(data.data.personas);

        if (data.data.tarjeta && data.data.efectivo) {
          setTipoPago('Ambos');
        } else if (data.data.tarjeta) {
          setTipoPago('Tarjeta');
        } else if (data.data.efectivo) {
          setTipoPago('Efectivo');
        } else {
          setTipoPago('No especificado');
        }

        const totalResponse = await fetch(`${API_BASE_URL}/fetch-total-final-order`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            mesa_id_arg: MesaId,
          }),
        });

        if (!totalResponse.ok) {
          throw new Error(`HTTP error! status: ${totalResponse.status}`);
        }

        const totalData = await totalResponse.json();

        // Update the state with the fetched total
        setTotalData(totalData.data[0].total_final);

      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  //Arreglo de productos de prueba para factura
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/fetch-order-checkout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            mesa_id_arg: MesaId,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        const fetchedProductos = data.data.map((item) => ({
          cantidad: item.cantidad,
          nombre: item.platobebidanombre,
          precio: `${item.precio_unitario} (Subtotal: ${item.subtotal})`,
        }));

        // Store the fetched data in the state
        setProductos(fetchedProductos);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (dividedBill === 'true') {
      setDividedTotal((totalData / numeroDePersonas).toFixed(2));
    } else {
      setDividedTotal(totalData);
    }
  }, [totalData, numeroDePersonas, dividedBill]);

  // Componente Producto
  function Producto({ cantidad, nombre, precio }) {
    return (
      <div className="productos__factura">
        <span>{cantidad}</span>
        <span>{nombre}</span>
        <span>${precio}</span>
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
          <span>Fecha de emisión:</span> {fechaEmision}
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
        <span>Total: ${totalData}</span>
      </div>

      <div className="total_cuenta_dividida">
        <span>Cantidad a pagar por cada persona: ${dividedTotal}</span>
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
