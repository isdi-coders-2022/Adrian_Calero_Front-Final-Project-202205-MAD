import { createAction } from "@reduxjs/toolkit";
import { iProfesional } from "../../interfaces/interfaces";
import { actionTypes } from "./action.types";

export const loadProfesionalAction = createAction<iProfesional[]>(
    actionTypes["profesional@load"]
);
