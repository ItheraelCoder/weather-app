import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searches: JSON.parse(localStorage.getItem('searchHistory')) || [],
};

export const searchHistorySlice = createSlice({
  name: 'searchHistory',
  initialState,
  reducers: {
    addSearch: (state, action) => {
      state.searches.push(action.payload);
      localStorage.setItem('searchHistory', JSON.stringify(state.searches));
    },
    clearHistory: (state) => {
      state.searches = [];
      localStorage.removeItem('searchHistory');
    },
  },
});

export const { addSearch, clearHistory } = searchHistorySlice.actions;
searchHistorySlice.reducer;