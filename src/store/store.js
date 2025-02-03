import { configureStore } from '@reduxjs/toolkit';
import { searchSlice, authSlice, searchHistorySlice } from './';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    search: searchSlice.reducer,
    searchHistory: searchHistorySlice.reducer
  },
});