import { configureStore } from "@reduxjs/toolkit";
import { iProfesional, iUser } from "../interfaces/interfaces";
import { Review } from "../models/review.model";
import { profesionalReducer } from "../redux/profesional-reducer/action.reducer";
import { reviewReducer } from "../redux/review-reducer/action.reducer";
import { userReducer } from "../redux/user-reducer/action.reducer";

export interface iStore {
    user: iUser;
    profesional: Array<iProfesional>;
    review: Array<Review>;
}

export const preloadedState: iStore = {
    user: {} as iUser,
    profesional: [] as Array<iProfesional>,
    review: [] as Array<Review>,
};

export const store = configureStore({
    reducer: {
        user: userReducer,
        profesional: profesionalReducer,
        review: reviewReducer,
    },
    preloadedState,
});
