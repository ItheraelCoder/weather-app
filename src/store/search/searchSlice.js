import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    searchTerm: '', // Término de búsqueda (nombre de la ciudad)
    weatherData: null, // Datos del clima
    isLoading: false, // Estado de carga
    error: null, // Errores
};

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
      setSearchTerm: (state, action) => {
        state.searchTerm = action.payload;
      },
      setWeatherData: (state, action) => {
        state.weatherData = action.payload;
      },
      setLoading: (state, action) => {
        state.isLoading = action.payload;
      },
      setError: (state, action) => {
        state.error = action.payload;
      },
    },
});
  
export const { setSearchTerm, setWeatherData, setLoading, setError } = searchSlice.actions;
searchSlice.reducer;