import { configureStore } from "@reduxjs/toolkit";
import countriesReducer from "./countriesSlice";
import favouritesReducer from "./favouritesSlice";
import authReducer from "./authSlice";

export default configureStore({
  reducer: {
    countries: countriesReducer,
    favourites: favouritesReducer,
    auth: authReducer,

  },
});

