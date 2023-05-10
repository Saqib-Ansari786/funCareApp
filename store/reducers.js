import { createReducer } from "@reduxjs/toolkit";

const userInitialState = {
  userId: null,
};

export const userReducer = createReducer(userInitialState, {
  SET_USER_ID: (state, action) => {
    state.userId = action.payload;
  },
});
