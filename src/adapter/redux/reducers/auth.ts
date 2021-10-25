import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  loginErrorMessage: ''
};

export type AuthState = typeof initialState;

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {}
});

export const authReducer = authSlice.reducer;
