import { Link } from 'react-router-dom';
import Button from '../components/button';
import './homePage.css';
import React, { useEffect, useState } from 'react';

const API_BASE_URL = 'https://the-cozy-whiskers-api-vercel.vercel.app'

const formatPrice = (value) => {
  const num = Number(value)
  if (Number.isNaN(num)) return `Q${value}`
  return `Q${num.toFixed(2)}`
}

const HomePage = () => {
  const [featured, setFeatured] = useState(null)

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/food-plates`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        if (data.status === 'success' && Array.isArray(data.data) && data.data.length > 0) {
          const withImage = data.data.find(
            (item) => item.imagenlink || item.imagenLink
          )
          const pick = withImage || data.data[0]
          setFeatured(pick)
        }
      } catch (error) {
        console.error('No se pudo cargar el platillo destacado:', error)
      }
    }

    fetchFeatured()
  }, [])

  const featuredImage = featured?.imagenlink || featured?.imagenLink || '../resources/maincoffee.jpg'
  const featuredName = featured?.nombre || 'Cappuccino avellana + pastel de queso'
  const featuredPrice = featured?.precio ? formatPrice(featured.precio) : null

  return (
    <div className="home-landing">
      <header className="landing-header">
        <div className="brand">
          <img src="/resources/mainlogo.png" alt="The Cozy Whiskers" />
          <span>The Cozy Whiskers</span>
        </div>
        <nav className="landing-nav">
          <Link to="/menu">Menú</Link>
          <Link to="/login" className="nav-cta">Personal</Link>
        </nav>
      </header>

      <main className="hero">
        <div className="hero-text">
          <p className="eyebrow">Cat Cafe & Comfort Food</p>
          <h1>Tu segundo hogar, con café y ronroneos</h1>
          <p className="hero-sub">
            Un espacio cálido para compartir, con platos hechos en casa y bebidas
            que acompañan cada momento.
          </p>
          <div className="hero-actions">
            <Link to="/menu" className="btn-primary">Ver menú</Link>
            <Link to="/login" className="btn-ghost">Iniciar sesión</Link>
          </div>
        </div>
        <div className="hero-media">
          <img src={featuredImage} alt={featuredName} />
          <div className="hero-card">
            <p>Especial de la casa</p>
            <strong>{featuredName}</strong>
            {featuredPrice && <span className="hero-price">{featuredPrice}</span>}
          </div>
        </div>
      </main>

      <section className="highlights">
        <div className="highlight">
          <h3>Platos con alma</h3>
          <p>Ingredientes frescos, recetas caseras y porciones generosas.</p>
        </div>
        <div className="highlight">
          <h3>Cafe de especialidad</h3>
          <p>Tueste local, leche cremosa y mezclas que abrazan.</p>
        </div>
        <div className="highlight">
          <h3>Ambiente calmado</h3>
          <p>Espacios pensados para desconectar y disfrutar sin prisa.</p>
        </div>
      </section>

      <section className="menu-teaser">
        <div>
          <h2>Menú del día</h2>
          <p>Descubre nuestros platos y bebidas más pedidos.</p>
        </div>
        <Link to="/menu" className="btn-primary">Explorar menú</Link>
      </section>

      <footer className="landing-footer">
        <p>The Cozy Whiskers S.A. - 6a. Avenida 8-28 zona 9</p>
      </footer>
    </div>
  );
};

export default HomePage;
