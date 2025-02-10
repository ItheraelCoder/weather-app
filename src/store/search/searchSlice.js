import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    searchTerm: '',
    weatherData: null,
    isLoading: false,
    error: null,
    isCelsius: true
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
      toggleTemperatureUnit: (state) => {
        state.isCelsius = !state.isCelsius;
      },
    },
  });
  
export const { setSearchTerm, setWeatherData, setLoading, setError, toggleTemperatureUnit } = searchSlice.actions;
  
searchSlice.reducer;