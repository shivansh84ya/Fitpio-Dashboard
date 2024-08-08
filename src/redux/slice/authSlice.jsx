import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem('token', action.payload); // Store token in localStorage
    },
    clearToken: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token'); // Remove token from localStorage
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;
