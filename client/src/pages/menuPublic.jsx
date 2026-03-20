import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import './menuPublic.css'

const API_BASE_URL = 'https://the-cozy-whiskers-api-vercel.vercel.app'

const formatPrice = (value) => {
  const num = Number(value)
  if (Number.isNaN(num)) return `Q${value}`
  return `Q${num.toFixed(2)}`
}

const MenuPublic = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/food-plates`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        if (data.status === 'success') {
          setItems(data.data)
        } else {
          setError(data.message || 'No se pudo cargar el menú')
        }
      } catch (err) {
        setError(err.message || 'No se pudo cargar el menú')
      } finally {
        setLoading(false)
      }
    }

    fetchMenu()
  }, [])

  const groupedItems = useMemo(() => {
    return items.reduce((acc, item) => {
      const tipo = item.tipo || 'Otros'
      if (!acc[tipo]) acc[tipo] = []
      acc[tipo].push(item)
      return acc
    }, {})
  }, [items])

  return (
    <div className="menu-page">
      <header className="menu-header">
        <div className="brand">
          <img src="../resources/mainlogo.png" alt="The Cozy Whiskers" />
          <span>The Cozy Whiskers</span>
        </div>
        <nav className="menu-nav">
          <Link to="/">Home</Link>
          <Link to="/login" className="nav-cta">Personal</Link>
        </nav>
      </header>

      <section className="menu-hero">
        <div>
          <p className="eyebrow">Menú</p>
          <h1>Platos y bebidas para cada antojo</h1>
          <p>
            Nuestra carta mezcla recetas caseras, café de especialidad y opciones
            para compartir.
          </p>
        </div>
        <div className="hero-chip">Carta actual</div>
      </section>

      {loading && <p className="status">Cargando menú...</p>}
      {error && <p className="status error">{error}</p>}

      {!loading && !error && (
        <div className="menu-content">
          {Object.keys(groupedItems).map((tipo) => (
            <section key={tipo} className="menu-section">
              <h2>{tipo}</h2>
              <div className="menu-grid">
                {groupedItems[tipo].map((item) => (
                  <article key={item.platobebida_id} className="menu-card">
                    {item.imagenlink || item.imagenLink ? (
                      <img
                        src={item.imagenlink || item.imagenLink}
                        alt={item.nombre}
                      />
                    ) : (
                      <div className="menu-placeholder" />
                    )}
                    <div className="menu-info">
                      <div className="menu-title">
                        <h3>{item.nombre}</h3>
                        <span>{formatPrice(item.precio)}</span>
                      </div>
                      <p>{item.descripcion || 'Descripción disponible en la casa.'}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      <footer className="menu-footer">
        <p>Gracias por visitarnos. Te esperamos con café caliente y buenas vibras.</p>
      </footer>
    </div>
  )
}

export default MenuPublic
