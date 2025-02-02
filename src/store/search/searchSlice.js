import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchTerm: '', // Término de búsqueda
  results: [], // Resultados de la búsqueda
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
    setResults: (state, action) => {
      state.results = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setSearchTerm, setResults, setLoading, setError } = searchSlice.actions;
searchSlice.reducer;