import { configureStore } from "@reduxjs/toolkit";
import { iList, iProfesional, iUser } from "../interfaces/interfaces";
import { Review } from "../models/review.model";
import { listReducer } from "../redux/list-reducer/action.reducer";
import { profesionalReducer } from "../redux/profesional-reducer/action.reducer";
import { reviewReducer } from "../redux/review-reducer/action.reducer";
import { userReducer } from "../redux/user-reducer/action.reducer";

export interface iStore {
    user: iUser;
    profesional: Array<iProfesional>;
    review: Array<Review>;
    list: Array<iList>;
}

export const preloadedState: iStore = {
    user: {} as iUser,
    profesional: [] as Array<iProfesional>,
    review: [] as Array<Review>,
    list: [] as Array<iList>,
};

export const store = configureStore({
    reducer: {
        user: userReducer,
        profesional: profesionalReducer,
        review: reviewReducer,
        list: listReducer,
    },
    preloadedState,
});
