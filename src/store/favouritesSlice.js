import { createSlice } from "@reduxjs/toolkit";
import { db } from "./firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

export const favouritesSlice = createSlice({
  name: "favourites",
  initialState: {
    favourites: [],
  },
  reducers: {
    setFavourites(state, action) {
      state.favourites = action.payload; 
    },
    addFavourite(state, action) {
      state.favourites.push(action.payload); 
    },
    removeFavourite(state, action) {
      const countryToRemove = action.payload;
      state.favourites = state.favourites.filter(
        (country) => country.name.official !== countryToRemove.name.official
      ); 
    },
    
    clearFavourites(state) {
      state.favourites = [];
    },
  },
});

// to fetch favorites from Firestore
export const fetchFavourites = (userId) => async (dispatch) => {
  const docRef = doc(db, "userFavorites", userId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    dispatch(setFavourites(docSnap.data().favorites)); 
  }
};

// to save favorites to Firestore
export const saveFavourites = (userId, favourites) => async () => {
  try {
    await setDoc(doc(db, "userFavorites", userId), { favorites: favourites }, { merge: true });
  } catch (error) {
    console.error("Error saving favourites to Firestore: ", error);
  }
};

export const { setFavourites, addFavourite, removeFavourite, clearFavourites } = favouritesSlice.actions;

export default favouritesSlice.reducer;
