import { configureStore } from "@reduxjs/toolkit";
import suggestionsReducer from "./slices/suggestionsSlice";
import userReducer from "./slices/userSlice";
import likesReducer from "./slices/likeSlice";

const store = configureStore({
  reducer: {
    suggestions: suggestionsReducer,
    user: userReducer,
    likes: likesReducer,
  },
});

export default store;
