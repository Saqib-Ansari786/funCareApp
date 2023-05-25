import { createReducer } from "@reduxjs/toolkit";

const userInitialState = {
  userId: null,
};

const playlandInitialState = {
  playland: null,
};

const updateRequestFlag = {
  bookingRequest: false,
  userRequest: false,
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

export const requestReducer = createReducer(updateRequestFlag, {
  SET_BOOKING_REQUEST_FLAG: (state, action) => {
    state.bookingRequest = action.payload;
  },
  SET_USER_REQUEST_FLAG: (state, action) => {
    state.userRequest = action.payload;
  },
});
