import { Link } from "react-router"

export const WelcomePage = () => {
  return (
    <div>
      <h1>¡Bienvenido a la aplicación del clima!</h1>
      <p>Por favor, inicia sesión para continuar.</p>
      <Link to="/login">
        <button>Iniciar sesión</button>
      </Link>
    </div>
  )
}
