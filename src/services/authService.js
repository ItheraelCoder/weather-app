import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth'; // URL del backend

export const register = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { username, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Error al registrar el usuario');
  }
};

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    console.log('Login response:', response.data); // Añadir para depuración
    return response.data; // Devuelve el token JWT junto con el usuario
  } catch (error) {
    console.log('error inicio de sesion')
    throw new Error(error.response?.data?.error || 'Error al iniciar sesión');
  }
};