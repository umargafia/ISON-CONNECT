import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: '',
  isLoggedIn: false,
  isLoading: false,
  isSupported: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    loginFailure: (state) => {
      state.isLoading = false;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = '';
    },
    setIsSupported: (state) => {
      state.isSupported = true;
    },
    setIsNotSupported: (state) => {
      state.isSupported = false;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  logout,
  setIsSupported,
  setIsNotSupported,
} = authSlice.actions;

export default authSlice.reducer;
