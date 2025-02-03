import { Navigate } from 'react-router';

export const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  // Si el usuario está autenticado, muestra el componente; de lo contrario, redirige al login
  return isAuthenticated ? children : <Navigate to="/login" />;
};

