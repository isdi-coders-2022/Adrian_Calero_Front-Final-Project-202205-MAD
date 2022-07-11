import { createReducer } from "@reduxjs/toolkit";
import { iLogin } from "../../interfaces/interfaces";
import * as ac from "./action.creator";

const initialState: iLogin = {
    user: {
        avatar: "",
        userName: "",
        email: "",
        passwd: "",
        favorites: [],
    },
    token: "",
};

export const userReducer = createReducer(initialState, (builder) => {
    return builder
        .addCase(ac.loginUserAction, (state, action) => action.payload)
        .addCase(ac.modifyUserAction, (state, action) => ({
            user: { ...state.user, ...action.payload.user },
            token: action.payload.token ? action.payload.token : state.token,
        }))
        .addDefaultCase((state) => state);
});
