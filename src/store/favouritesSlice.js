import { createSlice } from "@reduxjs/toolkit";
import { db } from "./firebase"; // Import your Firestore db instance
import { doc, setDoc, getDoc } from "firebase/firestore";

export const favouritesSlice = createSlice({
  name: "favourites",
  initialState: {
    favourites: [],
  },
  reducers: {
    setFavourites(state, action) {
      state.favourites = action.payload; // Set favorites from Firestore
    },
    addFavourite(state, action) {
      state.favourites.push(action.payload); // Add favorite to the list
    },
    removeFavourite(state, action) {
      const countryToRemove = action.payload; // Get the country to remove
      state.favourites = state.favourites.filter(
        (country) => country.name.official !== countryToRemove.name.official
      ); // Remove favorite from the state
    },
    
    clearFavourites(state) {
      state.favourites = [];
    },
  },
});

// Fetch user's favorites from Firestore
export const fetchFavourites = (userId) => async (dispatch) => {
  const docRef = doc(db, "userFavorites", userId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    dispatch(setFavourites(docSnap.data().favorites)); // Make sure 'favorites' matches your Firestore structure
  }
};

// Save user's favorites to Firestore
export const saveFavourites = (userId, favourites) => async () => {
  try {
    // Ensure you're using the correct variable name 'favourites'
    await setDoc(doc(db, "userFavorites", userId), { favorites: favourites }, { merge: true });
  } catch (error) {
    console.error("Error saving favourites to Firestore: ", error);
  }
};

export const { setFavourites, addFavourite, removeFavourite, clearFavourites } = favouritesSlice.actions;

export default favouritesSlice.reducer;
