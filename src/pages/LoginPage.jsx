import { useState } from 'react';
import { useNavigate } from 'react-router';
import { login } from '../services/authService';
import '../styles/LoginPage.css'

export const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { token } = await login(username, password); // Llama al servicio de inicio de sesión
      localStorage.setItem('token', token); // Guarda el token en localStorage
      navigate('/search'); // Redirige al usuario a la página de búsqueda
    } catch (err) {
      setError(err.message); // Muestra un mensaje de error si falla el inicio de sesión
    }
  };

  return (
    <div className="login-page">
      <h1>Iniciar sesión</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Nombre de usuario:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Iniciar sesión</button>
      </form>
      {error && <p className="error">{error}</p>}
      <p>
        ¿No tienes una cuenta? <a href="/signup">Regístrate aquí</a>.
      </p>
    </div>
  );
};