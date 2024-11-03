import { db } from "./firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

const favouritesCollection = collection(db, "favourites");

export const saveFavourite = async (userId, country) => {
  try {
    await addDoc(favouritesCollection, { userId, country });
  } catch (error) {
    console.error("Error saving favourite:", error);
  }
};

export const fetchFavourites = async (userId) => {
  try {
    const querySnapshot = await getDocs(favouritesCollection);
    const favourites = [];
    querySnapshot.forEach((doc) => {
      if (doc.data().userId === userId) {
        favourites.push(doc.data().country);
      }
    });
    return favourites;
  } catch (error) {
    console.error("Error fetching favourites:", error);
    throw error;
  }
};
