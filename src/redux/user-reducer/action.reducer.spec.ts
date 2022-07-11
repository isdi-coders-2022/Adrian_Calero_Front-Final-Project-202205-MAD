import { AnyAction } from "@reduxjs/toolkit";
import { iLogin } from "../../interfaces/interfaces";
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

    describe("When createUserAction ", () => {
        test("Then it shoul be add newUser", () => {
            const initialState: iLogin = mockUser;
            const newUser = { ...mockUser, _id: "2", userName: "pepee" };
            const newState = userReducer(
                initialState,
                ac.loginUserAction(newUser)
            );

            expect(newState).toStrictEqual(newUser);
        });
    });

    describe("When modifyUserAction ", () => {
        test("Then it shoul be modify mockUser", () => {
            const initialState: iLogin = mockUser;
            const modifyUser = {
                ...mockUser,
                user: { ...mockUser.user, userName: "updated" },
            };
            const newState = userReducer(
                initialState,
                ac.modifyUserAction(modifyUser)
            );

            expect(newState).toEqual(modifyUser);
        });
        test("If it not modify, then it shoul be not modify mockUser", () => {
            const initialState: iLogin = mockUser;
            const modifyUser = { ...mockUser, _id: "3" };
            const newState = userReducer(
                initialState,
                ac.modifyUserAction(modifyUser)
            );

            expect(newState).toStrictEqual(mockUser);
        });
    });

    describe("When caseDefault is called", () => {
        test("Then it shoul be same state", () => {
            const state = userReducer(mockUser, {} as AnyAction);

            expect(state).toEqual(mockUser);
        });
    });
});
