import { createReducer } from "@reduxjs/toolkit";
import { iProfesional } from "../../interfaces/interfaces";
import * as ac from "./action.creator";

const initialState: iProfesional[] = [];

export const profesionalReducer = createReducer(initialState, (builder) => {
    return builder
        .addCase(ac.loadProfesionalAction, (state, action) => [
            ...action.payload,
        ])
        .addDefaultCase((state) => state);
});
