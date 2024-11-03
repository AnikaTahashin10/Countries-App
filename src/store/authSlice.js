import { createSlice } from "@reduxjs/toolkit";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebase";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null, 
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload)); 
    },
    clearUser(state) {
      state.user = null;
      localStorage.removeItem("user");
    },
    setLoading(state, action) {
      state.loading = action.payload; 
    },
    setError(state, action) {
      state.error = action.payload; 
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
