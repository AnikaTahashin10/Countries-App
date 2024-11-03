// src/store/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebase";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null, // Load user from localStorage if available
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload; // Set user information
      localStorage.setItem("user", JSON.stringify(action.payload)); // Save user to localStorage
    },
    clearUser(state) {
      state.user = null; // Clear user information
      localStorage.removeItem("user"); // Remove user from localStorage
    },
    setLoading(state, action) {
      state.loading = action.payload; // Set loading state
    },
    setError(state, action) {
      state.error = action.payload; // Set error state
    },
  },
});

export const { setUser, clearUser, setLoading, setError } = authSlice.actions;

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    dispatch(setUser(userCredential.user));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    await signOut(auth);
    dispatch(clearUser());
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export default authSlice.reducer;
