import { configureStore } from "@reduxjs/toolkit";
import savedReducer from "./savedSlice";

const store = configureStore({
  reducer: {
    saved: savedReducer,
  },
});

store.subscribe(() => {
  try {
    const items = store.getState().saved.items;

    localStorage.setItem(
      "foodfacts-saved",
      JSON.stringify(items)
    );
  } catch (error) {
    console.log(error);
  }
});

export default store;