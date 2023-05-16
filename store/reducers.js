import { createReducer } from "@reduxjs/toolkit";

const userInitialState = {
  userId: null,
};

const playlandInitialState = {
  playland: null,
};

export const userReducer = createReducer(userInitialState, {
  SET_USER_ID: (state, action) => {
    state.userId = action.payload;
  },
});

export const playlandReducer = createReducer(playlandInitialState, {
  SET_PLAYLAND: (state, action) => {
    state.playland = action.payload;
  },
});
