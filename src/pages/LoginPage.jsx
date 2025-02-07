import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../store';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import '../styles/WeatherBGImage.css';
import '../App.css'

export const LoginPage = () => {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(loginUser({ username, password })).unwrap(); // Despacha la acción asíncrona y obtiene el resultado
      console.log('Login successful:', result); // Añadir para depuración
      navigate('/'); // Redirige al usuario después del inicio de sesión
    } catch (error) {
      console.error('Login failed:', error); // Añadir para depuración
      setError(error); // Muestra un mensaje de error si falla el inicio de sesión
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center from-blue-500 to-purple-600 relative overflow-hidden weather-bgimage">
      {/* Contenedor del formulario */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-4 z-10"
      >
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Iniciar sesión</h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre de usuario:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Contraseña:</label>
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
            Iniciar sesión
          </button>
        </form>
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-center text-red-600"
          >
            {error}
          </motion.p>
        )}
        <p className="mt-4 text-center text-gray-600">
          ¿No tienes una cuenta?{' '}
          <a href="/signup" className="text-blue-600 hover:underline">
            Regístrate aquí
          </a>
          .
        </p>
      </motion.div>
    </div>
  );
};