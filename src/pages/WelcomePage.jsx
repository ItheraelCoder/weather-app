import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { logout } from '../store';

export const WelcomePage = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()); // Cierra la sesión
    navigate('/'); // Redirige a la página de inicio
  };

  return (
    <div className="welcome-page">
      <h1>¡Bienvenido a la aplicación del clima!</h1>
      {!isAuthenticated && (
        <>
          <p>Por favor, inicia sesión para continuar.</p>
          <button onClick={() => navigate('/login')} className="login-button">
            Iniciar sesión
          </button>
        </>
      )}
      {isAuthenticated && (
        <>
          <p>¡Hola! Estás autenticado.</p>
          <button onClick={() => navigate('/search')} className="search-button">
            Ir al buscador
          </button>
          <button onClick={handleLogout} className="logout-button">
            Cerrar sesión
          </button>
        </>
      )}
    </div>
  );
};
