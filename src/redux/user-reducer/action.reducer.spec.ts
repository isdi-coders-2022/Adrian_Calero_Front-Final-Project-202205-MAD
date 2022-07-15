import { AnyAction } from "@reduxjs/toolkit";
import { iLogin, iUser } from "../../interfaces/interfaces";
import * as ac from "./action.creator";
import { userReducer } from "./action.reducer";

describe("Given de user redux", () => {
    const mockUser: iLogin = {
        token: "1",
        user: {
            _id: "1",
            avatar: "url",
            userName: "test",
            email: "test@test.com",
            passwd: "1234",
            favorites: [],
        },
    };

    describe("When loginUserAction", () => {
        test("Then it shoul be logged", () => {
            const initialState: iUser = mockUser.user;
            const newUser = { ...mockUser, _id: "2", userName: "pepe" };
            const newState = userReducer(
                initialState,
                ac.loginUserAction(newUser)
            );

            expect(newState).toEqual(newUser.user);
        });
    });

    describe("When modifyUserAction", () => {
        test("Then it shoul be modify mockUser", () => {
            const initialState: iUser = mockUser.user;
            const modifyUser = {
                ...mockUser,
                user: { ...mockUser.user, userName: "updated" },
            };
            const newState = userReducer(
                initialState,
                ac.modifyUserAction(modifyUser.user)
            );

            expect(newState).toEqual(modifyUser.user);
        });
        test("If it not modify, then it shoul be not modify mockUser", () => {
            const initialState: iUser = mockUser.user;
            const modifyUser = { ...mockUser, _id: "3" };
            const newState = userReducer(
                initialState,
                ac.modifyUserAction(modifyUser.user)
            );

            expect(newState).toEqual(mockUser.user);
        });
    });

    describe("When caseDefault is called", () => {
        test("Then it shoul be same state", () => {
            const state = userReducer(mockUser.user, {} as AnyAction);

            expect(state).toEqual(mockUser.user);
        });
    });
});
