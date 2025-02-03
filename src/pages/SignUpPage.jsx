import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import '../styles/SignUpPage.css'

export const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para registrar al usuario
    console.log('Registrando usuario:', { username, email, password });

    // Simulamos un registro exitoso
    alert('¡Registro exitoso! Por favor, inicia sesión.');
    navigate('/login'); // Redirigimos al usuario a la página de inicio de sesión
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
