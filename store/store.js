import { configureStore } from "@reduxjs/toolkit";
import { playlandReducer, requestReducer, userReducer } from "./reducers";

const store = configureStore({
  reducer: {
    user: userReducer,
    playland: playlandReducer,
    request: requestReducer,
  },
});

export default store;
