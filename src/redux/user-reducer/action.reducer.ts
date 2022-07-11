import { createReducer } from "@reduxjs/toolkit";
import { iLogin, iUser } from "../../interfaces/interfaces";
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
    return (
        builder
            .addCase(ac.loginUserAction, (state, action) => action.payload)
            // .addCase(ac.createUserAction, (state, action) => [
            //     ...state.user,
            //     action.payload,
            // ])
            // .addCase(ac.modifyUserAction, (state, action) =>
            //     state.map((item) =>
            //         item._id === action.payload._id ? action.payload : item
            //     )
            // )
            // .addCase(ac.deleteUserAction, (state, action) =>
            //     state.filter((item) => item._id !== action.payload._id)
            // );
            .addDefaultCase((state) => state)
    );
});
