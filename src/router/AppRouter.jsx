
import { Routes, Route } from 'react-router';
import { LoginPage, SearchPage, WelcomePage, PrivateRoute, SignUpPage } from '../pages';

export const AppRouter = () => {
    return (
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* Ruta de registro */}
        <Route path="/signup" element={<SignUpPage />} />
        <Route
          path="/search"
          element={
            <PrivateRoute>
              <SearchPage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
      </Routes>
    );
  };