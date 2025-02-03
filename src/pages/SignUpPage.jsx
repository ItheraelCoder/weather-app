import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { register } from '../services/authService';
import '../styles/SignUpPage.css'
import { setError } from '../store';

export const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await register(username, password); // Llama al servicio de registro
      alert('¡Registro exitoso! Por favor, inicia sesión.');
      navigate('/login'); // Redirige al usuario a la página de inicio de sesión
    } catch (err) {
      setError(err.message); // Muestra un mensaje de error si falla el registro
    }
  };

  return (
    <div className="signup-page">
      <h1>Crear cuenta</h1>
      <form onSubmit={handleSignUp}>
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
          <label>Correo electrónico:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <button type="submit">Registrarse</button>
      </form>
      <p>
        ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link>.
      </p>
    </div>
  );
};
