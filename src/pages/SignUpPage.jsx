import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { register } from '../services/authService';
import { setError } from '../store';
import { motion } from 'framer-motion';
import '../styles/WeatherBGImage.css'

export const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await register(username, email, password); // Llama al servicio de registro
      alert('¡Registro exitoso! Por favor, inicia sesión.');
      navigate('/login'); // Redirige al usuario a la página de inicio de sesión
    } catch (err) {
      setError(err.message); // Muestra un mensaje de error si falla el registro
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center from-blue-500 to-purple-600 weather-bgimage">
      <motion.div
        initial={{ opacity: 0, y: -50 }} // Animación inicial del formulario
        animate={{ opacity: 1, y: 0 }} // Animación al cargar el formulario
        transition={{ duration: 0.5 }} // Duración de la animación
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-4"
      >
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Crear cuenta
        </h1>
        <form onSubmit={handleSignUp} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nombre de usuario:
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Correo electrónico:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contraseña:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Registrarse
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          ¿Ya tienes una cuenta?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Inicia sesión aquí
          </Link>
          .
        </p>
      </motion.div>
    </div>
  );
};