import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/button';
import './homePage.css';

const HomePage = () => {
  return (
    <div className="home">
      <img src="../../public/resources/titlelogo.png" alt="Title" className="home__title" />
      <img
        src="../../public/resources/maincoffee.jpg"
        alt="Background"
        className="home__background"
      />
      <img src="../../public/resources/paw.png" alt="Paw" className="paw" />
      <img src="../../public/resources/paw2.png" alt="Paw" className="paw2" />
      <div className="home__buttons">
        <Link to={'/login'}>
          <Button text="Iniciar sesión" onClick={() => console.log('Iniciar sesion')} />
        </Link>
        <Link to={'/register'}>
          <Button text="Registrarse" onClick={() => console.log('Registrarse')} />
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
