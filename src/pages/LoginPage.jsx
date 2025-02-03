
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/auth/authSlice';
import { useNavigate } from 'react-router';
import '../styles/LoginPage.css'

export const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'usuario' && password === 'contraseña') {
      dispatch(login({ username }));
      navigate('/')
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="login-page">
      <h1>Iniciar sesión</h1>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Iniciar sesión</button>
      </form>
      <p>
        ¿No tienes una cuenta? <a href="/signup">Crea una cuenta aquí</a>.
      </p>
    </div>
  );
};