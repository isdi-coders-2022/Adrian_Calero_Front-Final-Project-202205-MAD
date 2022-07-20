import { createReducer } from "@reduxjs/toolkit";
import { iList } from "../../interfaces/interfaces";
import * as ac from "./action.creator";

const initialState: iList[] = [];

export const listReducer = createReducer(initialState, (builder) => {
    return builder
        .addCase(ac.setListAction, (state, action) => [...action.payload])
        .addDefaultCase((state) => state);
});
