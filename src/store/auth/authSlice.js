import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login as loginService, register as registerService } from '../../services/authService';

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
  token: localStorage.getItem('token')
};

// Acción asíncrona para el inicio de sesión
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await loginService(username, password);
      const { token, user } = response; // Asegúrate de que response contiene token y user
      if (!user) {
        throw new Error('Error: El usuario no está definido');
      }
      localStorage.setItem('token', token);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify(user));
      return { token, user };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Acción asíncrona para el registro de usuario
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await registerService(username, password);
      const { token, user } = response; // Asegúrate de que response contiene token y user
      if (!user) {
        throw new Error('Error: El usuario no está definido');
      }
      localStorage.setItem('token', token);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify(user));
      return { token, user };
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
      state.token = null;
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.error = action.payload;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.error = action.payload;
      });
  },
});

// Exporta las acciones síncronas
export const { logout } = authSlice.actions;

// Exporta el reducer
authSlice.reducer;