import { createAction } from "@reduxjs/toolkit";
import { iLogin, iUser } from "../../interfaces/interfaces";
import { actionTypes } from "./action.types";

export const loginUserAction = createAction<iLogin>(actionTypes["user@login"]);

export const modifyUserAction = createAction<iUser>(actionTypes["user@modify"]);
