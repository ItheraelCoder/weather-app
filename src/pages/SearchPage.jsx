import { useNavigate } from 'react-router-dom';

const SearchPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated'); // Elimina el estado de autenticación
    navigate('/login'); // Redirige al login
  };

  return (
    <div>
      <h1>Buscador del clima</h1>
      <p>¡Bienvenido! Aquí puedes buscar el clima de cualquier ciudad.</p>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
};

export default SearchPage;