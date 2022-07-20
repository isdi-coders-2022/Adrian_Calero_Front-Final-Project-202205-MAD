import { createAction } from "@reduxjs/toolkit";
import { iList } from "../../interfaces/interfaces";
import { actionTypes } from "./action.types";

export const loadListAction = createAction<iList[]>(actionTypes["list@load"]);

export const setListAction = createAction<iList[]>(actionTypes["list@set"]);
