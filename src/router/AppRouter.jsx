
import { Routes, Route } from 'react-router-dom';
import { LoginPage, SearchPage, WelcomePage, PrivateRoute } from '../pages';

export const AppRouter = () => {
    return (
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
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