
import { useState } from 'react';
import { useNavigate, Link  } from 'react-router-dom';
import '../styles/LoginPage.css'

export const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Simulamos un inicio de sesión exitoso
    if (username === 'usuario' && password === 'contraseña') {
      localStorage.setItem('isAuthenticated', 'true'); // Guardamos el estado de autenticación
      navigate('/search'); // Redirigimos a la página privada
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="login-page">
      <h1>Iniciar sesión</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Usuario:</label>
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
      <p>
        ¿No tienes una cuenta?{' '}
        <Link to="/signup">Crea una cuenta aquí</Link> {/* Botón para crear cuenta */}
      </p>
    </div>
  );
};
