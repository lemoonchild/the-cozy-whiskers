import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/button';
import Input from '../components/input';
import SelectInput from '../components/selectInput';
import './loginRegister.css';

const API_BASE_URL = 'https://the-cozy-whiskers-api-vercel.vercel.app';

const getCurrentDate = () => {
  const date = new Date();
  const year = date.getFullYear().toString();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
};

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleUsername = (value) => {
    console.log(value);
    setUsername(value);
  };

  const handlePassword = (value) => {
    setPassword(value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);

      if (data.status === 'success') {
        localStorage.setItem('userLocal', username);
        localStorage.setItem('passwordLocal', password);

        navigate('/mesaMesero');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className="login">
      <img src="../../public/resources/catlogo.png" alt="Title" className="cat__logo" />
      <img src="../../public/resources/coffee.png" alt="Background" className="login__background" />
      <div className="login__box">
        <h1 className="title__login">Iniciar Sesión</h1>
        <p className="title__description">¡Hola de nuevo!</p>
        <form className="login__form" onSubmit={handleLogin}>
          <Input //INFORMACIÓN DE USUARIO
            className="login-input"
            label="Usuario"
            type="text"
            name="username"
            id="username"
            placeholder="Introduce tu usuario"
            isNumeric={false}
            onValueChange={handleUsername}
          />
          <Input //INFORMACIÓN DE CONTRASEÑA
            className="login-input"
            label="Contraseña"
            type="password"
            name="password"
            id="password"
            placeholder="Introduce tu contraseña"
            isNumeric={false}
            onValueChange={handlePassword}
          />
          <div className="login__button-container">
            <Button type="submit" text="¡Entrar!" />
          </div>
        </form>
      </div>
    </div>
  );
};

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleUsername = (value) => {
    setUsername(value);
  };
  const handlePassword = (value) => {
    setPassword(value);
  };
  const handleRole = (value) => {
    setRole(value);
  };

  const roles = [
    { value: 'Mesero', label: 'Mesero' },
    { value: 'Cocinero', label: 'Cocinero' },
    { value: 'Barista', label: 'Barista' },
  ];

  return (
    <div className="login">
      <img src="../../public/resources/catlogo.png" alt="Title" className="cat__logo" />
      <img src="../../public/resources/coffee.png" alt="Background" className="login__background" />
      <div className="login__box">
        <h1 className="title__login">Registrase</h1>
        <p className="title__description">¡Un gusto!</p>
        <form className="login__form">
          <Input //INFORMACIÓN DE USUARIO
            className="login-input"
            label="Usuario"
            type="text"
            name="username"
            id="username"
            value={username}
            placeholder="Introduce tu usuario"
            onValueChange={handleUsername}
          />
          <Input //INFORMACIÓN DE CONTRASEÑA
            className="login-input"
            label="Contraseña"
            type="password"
            name="password"
            id="password"
            value={password}
            placeholder="Introduce tu contraseña"
            onValueChange={handlePassword}
          />
          <SelectInput //ROL DEL USUARIO
            className="login-input"
            label="Rol en la empresa"
            name="role"
            id="role"
            options={roles}
            size="4"
            onValueChange={handleRole}
          />
          <div className="login__button-container">
            <Link to={'/login'}>
              <Button
                text="¡Bienvenid@!"
                onClick={async () => {
                  try {
                    const response = await fetch(`${API_BASE_URL}/register`, {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        name: username,
                        role: role,
                        startDate: getCurrentDate(),
                        username: username,
                        password: password,
                      }),
                    });

                    if (!response.ok) {
                      throw new Error(`HTTP error! status: ${response.status}`);
                    }

                    const data = await response.json();
                    console.log(data);
                  } catch (error) {
                    console.error('An error occurred:', error);
                  }
                }}
              />
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

const LoginRegistro = ({ action }) => {
  return (
    <div>
      {action === 'login' && <Login />}
      {action === 'register' && <Register />}
    </div>
  );
};

export default LoginRegistro;
