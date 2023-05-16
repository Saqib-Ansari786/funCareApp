import { configureStore } from "@reduxjs/toolkit";
import { playlandReducer, userReducer } from "./reducers";

const store = configureStore({
  reducer: {
    user: userReducer,
    playland: playlandReducer,
  },
});

export default store;
