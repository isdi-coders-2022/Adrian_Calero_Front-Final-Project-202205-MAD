import { createReducer } from "@reduxjs/toolkit";
import { iUser } from "../../interfaces/interfaces";
import * as ac from "./action.creator";

const initialState: iUser = {
    avatar: "",
    userName: "",
    email: "",
    passwd: "",
    favorites: [],
};

export const userReducer = createReducer(initialState, (builder) => {
    return builder
        .addCase(ac.loginUserAction, (state, action) => ({
            ...action.payload.user,
        }))
        .addCase(ac.modifyUserAction, (state, action) => ({
            ...state,
            ...action.payload,
        }))
        .addDefaultCase((state) => state);
});
