import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/button'
import Input from '../components/input'
import SelectInput from '../components/selectInput'
import './loginRegister.css'

const Login = () => {
  return (
    <div className="login">
      <img src="../resources/catlogo.png" alt="Title" className="cat__logo" />
      <img src="../resources/coffee.png" alt="Background" className="login__background" />
      <div className="login__box">
        <h1 className="title__login">Iniciar Sesión</h1>
        <p className="title__description">¡Hola de nuevo!</p>
        <form className="login__form">
          <Input //INFORMACIÓN DE USUARIO
            className="login-input"
            label="Usuario"
            type="text"
            name="username"
            id="username"
            placeholder="Introduce tu usuario"
          />
          <Input //INFORMACIÓN DE CONTRASEÑA
            className="login-input"
            label="Contraseña"
            type="password"
            name="password"
            id="password"
            placeholder="Introduce tu contraseña"
          />
          <div className="login__button-container">
            <Link to={'/cocinero'}>
              <Button text="¡Entrar!" onClick={() => console.log('Inicio de sesión exitoso')} />
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

const Register = () => {
  const roles = [
    { value: 'mesero', label: 'Mesero' },
    { value: 'cocinero', label: 'Cocinero' },
    { value: 'barista', label: 'Barista' },
  ]

  return (
    <div className="login">
      <img src="../resources/catlogo.png" alt="Title" className="cat__logo" />
      <img src="../resources/coffee.png" alt="Background" className="login__background" />
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
            placeholder="Introduce tu usuario"
          />
          <Input //INFORMACIÓN DE CONTRASEÑA
            className="login-input"
            label="Contraseña"
            type="password"
            name="password"
            id="password"
            placeholder="Introduce tu contraseña"
          />
          <SelectInput
            className="login-input"
            label="Rol en la empresa"
            name="role"
            id="role"
            options={roles}
          />
          <div className="login__button-container">
            <Link to={'/cocinero'}>
              <Button text="¡Bienvenid@!" onClick={() => console.log('Registro exitoso')} />
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

const LoginRegistro = ({ action }) => {
  return (
    <div>
      {action === 'login' && <Login />}
      {action === 'register' && <Register />}
    </div>
  )
}

export default LoginRegistro
