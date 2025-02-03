import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login as loginService } from '../../services/authService';

// Función para obtener el usuario desde localStorage
const getStoredUser = () => {
  const user = localStorage.getItem('user');
  if (user && user !== 'undefined') {
    try {
      return JSON.parse(user);
    } catch (error) {
      console.error('Error al analizar el usuario desde localStorage:', error);
    }
  }
  return null;
};

// Estado inicial
const initialState = {
  isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
  user: getStoredUser(),
  error: null,
};

// Acción asíncrona para el inicio de sesión
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const { token, user } = await loginService(username, password);
      localStorage.setItem('token', token);
      localStorage.setItem('isAuthenticated', 'true');
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        console.error('Error: El usuario no está definido');
      }
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice de autenticación
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload;
      });
  },
});

// Exporta las acciones síncronas
export const { logout } = authSlice.actions;

// Exporta el reducer
authSlice.reducer;