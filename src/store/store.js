import { configureStore } from '@reduxjs/toolkit';
import { searchSlice } from './search/searchSlice'; // Importa el slice de búsqueda

export const store = configureStore({
  reducer: {
    search: searchSlice.reducer, // Agrega el slice al store
  },
});