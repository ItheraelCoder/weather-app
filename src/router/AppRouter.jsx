
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LoginPage, SearchPage, WelcomePage, PrivateRoute } from '../pages';

export const AppRouter = () => {
    return (
      <Router>
        <Routes>
          {/* Ruta de bienvenida */}
          <Route path="/" element={<WelcomePage />} />
  
          {/* Ruta de inicio de sesión */}
          <Route path="/login" element={<LoginPage />} />
  
          {/* Ruta privada (solo accesible después de iniciar sesión) */}
          <Route
            path="/search"
            element={
              <PrivateRoute>
                <SearchPage />
              </PrivateRoute>
            }
          />
  
          {/* Ruta por defecto para páginas no encontradas */}
          <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
        </Routes>
      </Router>
    );
};
