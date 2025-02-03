import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const WelcomePage = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  return (
    <div className="welcome-page">
      <h1>¡Bienvenido a la aplicación del clima!</h1>
      <p>Por favor, inicia sesión para continuar.</p>
      {isAuthenticated && (
        <button onClick={() => navigate('/search')} className="search-button">
          Ir al buscador
        </button>
      )}
    </div>
  );
};

