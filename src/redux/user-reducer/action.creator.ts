import { createAction } from "@reduxjs/toolkit";
import { iUser } from "../../interfaces/interfaces";
import { actionTypes } from "./action.types";

export const loadUserAction = createAction<iUser[]>(actionTypes["user@load"]);

export const createUserAction = createAction<iUser>(actionTypes["user@create"]);

export const modifyUserAction = createAction<iUser>(actionTypes["user@modify"]);

export const deleteUserAction = createAction<iUser>(actionTypes["user@delete"]);
