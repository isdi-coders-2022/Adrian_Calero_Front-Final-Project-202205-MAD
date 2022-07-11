import { createAction } from "@reduxjs/toolkit";
import { iLogin, iUser } from "../../interfaces/interfaces";
import { actionTypes } from "./action.types";

export const loginUserAction = createAction<iLogin>(actionTypes["user@login"]);

export const createUserAction = createAction<iLogin>(
    actionTypes["user@create"]
);

export const modifyUserAction = createAction<iUser>(actionTypes["user@modify"]);

export const deleteUserAction = createAction<iUser>(actionTypes["user@delete"]);
