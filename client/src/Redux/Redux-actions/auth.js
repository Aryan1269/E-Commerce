import { createSlice } from "@reduxjs/toolkit";

// Create the authentication slice
export const AuthSlice = createSlice({
  name: "authentication",
  initialState: {
    isLoading: false,
    isAuthenticated: false, // You might want to track if the user is authenticated
    user: null, // You can store user information here
    error: null, // Optional: to store any error messages
  },
  reducers: {
   
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null; 
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload; 
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload; 
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null; 
    },
  },
});


export const { loginStart, loginSuccess, loginFailure, logout } =
  AuthSlice.actions;


export default AuthSlice.reducer;
