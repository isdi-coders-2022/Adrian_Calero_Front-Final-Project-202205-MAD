import { createReducer } from "@reduxjs/toolkit";
import { iReview } from "../../interfaces/interfaces";
import * as ac from "./action.creator";

const initialState: iReview[] = [];

export const reviewReducer = createReducer(initialState, (builder) => {
    return builder
        .addCase(ac.loadReviewAction, (state, action) => [...action.payload])
        .addCase(ac.createReviewAction, (state, action) => [
            ...state,
            action.payload,
        ])
        .addCase(ac.modifyReviewAction, (state, action) =>
            state.map((item) =>
                item._id === action.payload._id ? action.payload : item
            )
        )
        .addCase(ac.deleteReviewAction, (state, action) =>
            state.filter((item) => item._id !== action.payload._id)
        );
});
