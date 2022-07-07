import { createAction } from "@reduxjs/toolkit";
import { iReview } from "../../interfaces/interfaces";
import { actionTypes } from "./action.types";

export const loadReviewAction = createAction<iReview[]>(
    actionTypes["review@load"]
);

export const createReviewAction = createAction<iReview>(
    actionTypes["review@create"]
);

export const modifyReviewAction = createAction<iReview>(
    actionTypes["review@modify"]
);

export const deleteReviewAction = createAction<iReview>(
    actionTypes["review@delete"]
);
