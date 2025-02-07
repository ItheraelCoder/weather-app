import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { logout } from '../store';
import { ProfileButton } from '../helpers';
import { FaSun } from 'react-icons/fa';
import '../styles/WeatherBGImage.css';

export const WelcomePage = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()); // Cierra la sesión
    navigate('/'); // Redirige a la página de inicio
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-400 to-blue-600 p-4 weather-bgimage">
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg text-center max-w-md w-full">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 flex items-center justify-center">
          <FaSun className="mr-2" />
          ¡Bienvenido a Weather Finder!
        </h1>
        {!isAuthenticated && (
          <>
            <p className="text-gray-700 mb-6">
              Por favor, inicia sesión para continuar.
            </p>
            <button
              onClick={() => navigate('/login')}
              className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Iniciar sesión
            </button>
          </>
        )}
        {isAuthenticated && (
          <>
            <p className="text-gray-700 mb-6">¡Hola! Estás autenticado.</p>
            <div className="flex flex-wrap gap-4 justify-center"> {/* Botones en fila con espacio entre ellos */}
              <button
                onClick={() => navigate('/search')}
                className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 transition duration-300"
              >
                Ir al buscador
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white py-2 px-6 rounded-md hover:bg-red-700 transition duration-300"
              >
                Cerrar sesión
              </button>
              <ProfileButton />
            </div>
          </>
        )}
      </div>
    </div>
  );
};