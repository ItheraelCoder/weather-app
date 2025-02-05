import { Navigate } from 'react-router';
import PropTypes from 'prop-types'

export const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  // Si el usuario está autenticado, muestra el componente; de lo contrario, redirige al login
  return isAuthenticated ? children : <Navigate to="/login" />;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

