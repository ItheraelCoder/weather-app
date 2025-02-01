
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div>
      <h1>Iniciar sesión</h1>
      <input
        type="text"
        placeholder="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Iniciar sesión</button>
    </div>
  );
};

