import { configureStore } from "@reduxjs/toolkit";
import { iProfesional, iReview, iUser } from "../interfaces/interfaces";
import { profesionalReducer } from "../redux/profesional-reducer/action.reducer";
import { reviewReducer } from "../redux/review-reducer/action.reducer";
import { userReducer } from "../redux/user-reducer/action.reducer";

export interface iStore {
    user: Array<iUser>;
    profesional: Array<iProfesional>;
    review: Array<iReview>;
}

export const preloadedState: iStore = {
    user: [] as Array<iUser>,
    profesional: [] as Array<iProfesional>,
    review: [] as Array<iReview>,
};

export const store = configureStore({
    reducer: {
        user: userReducer,
        profesional: profesionalReducer,
        review: reviewReducer,
    },
    preloadedState,
});
