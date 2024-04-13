import React, { useState, useEffect, useRef } from 'react'
import './cocineroBarista.css'
import Card from '../components/card'
import Popup from '../components/popUp'
import Button from '../components/button'

const Cocinero = () => {
  //Colocar el nombre de empleado y rol según el usuario
  const empleadoNombre = 'Juan Perez'
  const rolEmpleado = 'Cocinero'

  //Bebidas de prueba utilizados para las cartas
  const [dishes, setDishes] = useState([
    {
      id: 1,
      image: '//i.pinimg.com/564x/43/17/c3/4317c3a2ca1f923b43d6d03e98b87351.jpg',
      time: '12:20 pm',
      title: 'Bagel con huevo, jamón y queso',
      size: 'Mediano',
      quantity: 1,
      note: 'Pan integral, jamón de pavo',
    },
    {
      id: 2,
      image: 'https://i.pinimg.com/564x/01/06/46/010646301747e2a765574b2415049621.jpg',
      time: '12:20 pm',
      title: 'Ensalada de Fideos Fríos Coreanos (Naengmyeon)',
      size: 'Grande',
      quantity: 2,
      note: 'Aderezo aparte, sin nueces',
    },
    {
      id: 3,
      image: 'https://i.pinimg.com/564x/fa/1d/31/fa1d31242226ca5f2bf89c6e6c4a50a7.jpg',
      time: '12:20 pm',
      title: 'Sándwich ',
      size: 'Mediano',
      quantity: 1,
      note: 'Sin cebolla, agregar pepinillos',
    },
    {
      id: 4,
      image: '//i.pinimg.com/564x/9e/e2/84/9ee2846b3085976e24d33655e43443f2.jpg',
      time: '12:20 pm',
      title: 'Jugo natural de naranja',
      size: 'Grande',
      quantity: 1,
      note: 'Con hielo, sin azúcar',
    },
    {
      id: 5,
      image: '//i.pinimg.com/564x/43/17/c3/4317c3a2ca1f923b43d6d03e98b87351.jpg',
      time: '12:20 pm',
      title: 'Bagel con huevo, jamón y queso',
      size: 'Mediano',
      quantity: 1,
      note: 'Pan integral, jamón de pavo',
    },
    {
      id: 6,
      image: 'https://i.pinimg.com/564x/01/06/46/010646301747e2a765574b2415049621.jpg',
      time: '12:20 pm',
      title: 'Ensalada fresca de temporada',
      size: 'Grande',
      quantity: 2,
      note: 'Aderezo aparte, sin nueces',
    },
    {
      id: 7,
      image: 'https://i.pinimg.com/564x/fa/1d/31/fa1d31242226ca5f2bf89c6e6c4a50a7.jpg',
      time: '12:20 pm',
      title: 'Sándwich de pollo grillado',
      size: 'Mediano',
      quantity: 1,
      note: 'Sin cebolla, agregar pepinillos',
    },
    {
      id: 8,
      image: '//i.pinimg.com/564x/9e/e2/84/9ee2846b3085976e24d33655e43443f2.jpg',
      time: '12:20 pm',
      title: 'Jugo natural de naranja',
      size: 'Grande',
      quantity: 1,
      note: 'Con hielo, sin azúcar',
    },
  ])

  //Actualizar la pagina cada 3 segundos
  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log('Esto se ejecuta cada 3 segundos')

      // Aquí es donde se actualiza el estado o las acciones
      //Ejemplo de llamar función para obtener nuevos datos y actualizar estado con datos:
      // fetchNuevosDatos().then(nuevosDatos => {
      //   setDatos(nuevosDatos);
      // });
    }, 3000) // Se ejecuta cada 3 segundos

    // Función de limpieza que React ejecutará cuando el componente se desmonte
    return () => clearInterval(intervalId)
  }, []) // Las dependencias vacías indican que solo se ejecuta al montar y desmontar

  // Reloj
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  //Cartas
  const layoutRef = useRef()

  useEffect(() => {
    // Cada vez que se actualiza la lista de platos, se desplaza al final
    if (layoutRef.current) {
      // Desplaza al final del contenedor
      layoutRef.current.scrollLeft = layoutRef.current.scrollWidth
    }
  }, [dishes.length])

  //PopUp de información de la carta
  const [isPopupOpen, setPopupOpen] = useState(false)
  const [selectedDish, setSelectedDish] = useState(null)

  const handlePrepareClick = (dish) => {
    setSelectedDish(dish)
    setPopupOpen(true)
  }

  const removeDish = (dishId) => {
    setDishes(dishes.filter((dish) => dish.id !== dishId))
    setPopupOpen(false)
  }

  return (
    <div className="cocinero">
      <div className="header">
        <img src="../resources/mainlogo.png" alt="Logo" className="main__logo" />
        <div className="employee-info">
          <p className="name__empleado">
            <span>Empleado:</span> {empleadoNombre}
          </p>
          <p className="rol__empleado">
            <span>Rol:</span> {rolEmpleado}
          </p>
        </div>
        <div className="button__satisfaccion_cocinero">
          <Button text="Cerrar Sesión" onClick={() => console.log('Registrarse')} />
        </div>
      </div>
      <div className="header-title">
        <p className="main__title">Pedidos</p>
        <p className="current-time">{currentTime.toLocaleTimeString()}</p>
      </div>
      <div className="cocinero-layout" ref={layoutRef}>
        <div className="cards-container">
          {dishes.map((dish) => (
            <Card
              key={dish.id}
              image={dish.image}
              time={dish.time}
              title={dish.title}
              onPrepareClick={() => handlePrepareClick(dish)}
              buttonText="Preparar"
            />
          ))}
        </div>
      </div>

      <div className="footer_cb">
        <p className="page__message">Your Second Home, with a Feline Twist</p>
      </div>

      <Popup
        isOpen={isPopupOpen}
        closePopup={() => setPopupOpen(false)}
        imageSrc={selectedDish?.image}
        title={`Preparando: ${selectedDish?.title}`}
        size={selectedDish?.size}
        quantity={selectedDish?.quantity}
        note={selectedDish?.note}
        onRealizado={() => removeDish(selectedDish?.id)}
      ></Popup>
    </div>
  )
}

const Barista = () => {
  //Colocar el nombre de empleado y rol según el usuario
  const empleadoNombre = 'Juan Perez'
  const rolEmpleado = 'Barista'

  //Bebidas utilizados para las cartas
  const [dishes, setDishes] = useState([
    {
      id: 1,
      image: '//i.pinimg.com/564x/43/17/c3/4317c3a2ca1f923b43d6d03e98b87351.jpg',
      time: '12:20 pm',
      title: 'Bagel con huevo, jamón y queso',
      size: 'Mediano',
      quantity: 1,
      note: 'Pan integral, jamón de pavo',
    },
    {
      id: 2,
      image: 'https://i.pinimg.com/564x/01/06/46/010646301747e2a765574b2415049621.jpg',
      time: '12:20 pm',
      title: 'Ensalada fresca de temporada',
      size: 'Grande',
      quantity: 2,
      note: 'Aderezo aparte, sin nueces',
    },
    {
      id: 3,
      image: 'https://i.pinimg.com/564x/fa/1d/31/fa1d31242226ca5f2bf89c6e6c4a50a7.jpg',
      time: '12:20 pm',
      title: 'Sándwich de pollo grillado',
      size: 'Mediano',
      quantity: 1,
      note: 'Sin cebolla, agregar pepinillos',
    },
    {
      id: 4,
      image: '//i.pinimg.com/564x/9e/e2/84/9ee2846b3085976e24d33655e43443f2.jpg',
      time: '12:20 pm',
      title: 'Jugo natural de naranja',
      size: 'Grande',
      quantity: 1,
      note: 'Con hielo, sin azúcar',
    },
    {
      id: 5,
      image: '//i.pinimg.com/564x/43/17/c3/4317c3a2ca1f923b43d6d03e98b87351.jpg',
      time: '12:20 pm',
      title: 'Bagel con huevo, jamón y queso',
      size: 'Mediano',
      quantity: 1,
      note: 'Pan integral, jamón de pavo',
    },
    {
      id: 6,
      image: 'https://i.pinimg.com/564x/01/06/46/010646301747e2a765574b2415049621.jpg',
      time: '12:20 pm',
      title: 'Ensalada fresca de temporada',
      size: 'Grande',
      quantity: 2,
      note: 'Aderezo aparte, sin nueces',
    },
    {
      id: 7,
      image: 'https://i.pinimg.com/564x/fa/1d/31/fa1d31242226ca5f2bf89c6e6c4a50a7.jpg',
      time: '12:20 pm',
      title: 'Sándwich de pollo grillado',
      size: 'Mediano',
      quantity: 1,
      note: 'Sin cebolla, agregar pepinillos',
    },
    {
      id: 8,
      image: '//i.pinimg.com/564x/9e/e2/84/9ee2846b3085976e24d33655e43443f2.jpg',
      time: '12:20 pm',
      title: 'Jugo natural de naranja',
      size: 'Grande',
      quantity: 1,
      note: 'Con hielo, sin azúcar',
    },
  ])

  //Actualizar la pagina cada 3 segundos
  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log('Esto se ejecuta cada 3 segundos')

      // Aquí es donde se actualiza el estado o las acciones
      //Ejemplo de llamar función para obtener nuevos datos y actualizar estado con datos:
      // fetchNuevosDatos().then(nuevosDatos => {
      //   setDatos(nuevosDatos);
      // });
    }, 3000) // Se ejecuta cada 3 segundos

    // Función de limpieza que React ejecutará cuando el componente se desmonte
    return () => clearInterval(intervalId)
  }, []) // Las dependencias vacías indican que solo se ejecuta al montar y desmontar

  // Reloj
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  //Cartas
  const layoutRef = useRef()

  useEffect(() => {
    // Cada vez que se actualiza la lista de platos, se desplaza al final
    if (layoutRef.current) {
      // Desplaza al final del contenedor
      layoutRef.current.scrollLeft = layoutRef.current.scrollWidth
    }
  }, [dishes.length])

  //PopUp de información de la carta
  const [isPopupOpen, setPopupOpen] = useState(false)
  const [selectedDish, setSelectedDish] = useState(null)

  const handlePrepareClick = (dish) => {
    setSelectedDish(dish)
    setPopupOpen(true)
  }

  const removeDish = (dishId) => {
    setDishes(dishes.filter((dish) => dish.id !== dishId))
    setPopupOpen(false)
  }

  return (
    <div className="cocinero">
      <div className="header">
        <img src="../resources/mainlogo.png" alt="Logo" className="main__logo" />
        <div className="employee-info">
          <p className="name__empleado">
            <span>Empleado:</span> {empleadoNombre}
          </p>
          <p className="rol__empleado">
            <span>Rol:</span> {rolEmpleado}
          </p>
        </div>
        <div className="button__satisfaccion_cocinero">
          <Button text="Cerrar Sesión" onClick={() => console.log('Registrarse')} />
        </div>
      </div>
      <div className="header-title">
        <p className="main__title">Pedidos</p>
        <p className="current-time">{currentTime.toLocaleTimeString()}</p>
      </div>
      <div className="cocinero-layout" ref={layoutRef}>
        <div className="cards-container">
          {dishes.map((dish) => (
            <Card
              key={dish.id}
              image={dish.image}
              time={dish.time}
              title={dish.title}
              onPrepareClick={() => handlePrepareClick(dish)}
              buttonText="Preparar"
            />
          ))}
        </div>
      </div>

      <div className="footer_cb">
        <p className="page__message">Your Second Home, with a Feline Twist</p>
      </div>

      <Popup
        isOpen={isPopupOpen}
        closePopup={() => setPopupOpen(false)}
        imageSrc={selectedDish?.image}
        title={`Preparando: ${selectedDish?.title}`}
        size={selectedDish?.size}
        quantity={selectedDish?.quantity}
        note={selectedDish?.note}
        onRealizado={() => removeDish(selectedDish?.id)}
      ></Popup>
    </div>
  )
}

//Cambia entre las funciones según si es cocinero o barista
const CocineroBarista = ({ action }) => {
  return (
    <div>
      {action === 'cocinero' && <Cocinero />}
      {action === 'barista' && <Barista />}
    </div>
  )
}

export default CocineroBarista
