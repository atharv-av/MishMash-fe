import { configureStore } from "@reduxjs/toolkit";
import suggestionsReducer from "./slices/suggestionsSlice";
import userReducer from "./slices/userSlice";

const store = configureStore({
  reducer: {
    suggestions: suggestionsReducer,
    user: userReducer,
  },
});

export default store;
