import { createReducer, createSlice } from "@reduxjs/toolkit";



const initialState = {
    value: 0,
    status: "idle",
};

export const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        }
    },
});