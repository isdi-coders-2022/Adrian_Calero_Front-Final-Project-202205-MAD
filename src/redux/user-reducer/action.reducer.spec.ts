import { iUser } from "../../interfaces/interfaces";
import * as ac from "./action.creator";
import { userReducer } from "./action.reducer";

describe("Given de user redux", () => {
    const mockUser: iUser = {
        _id: "1",
        avatar: "url",
        userName: "test",
        email: "test@test.com",
        passwd: "1234",
        favorites: [],
    };
    describe("When loadUserAction ", () => {
        test("Then it shoul render user mock", () => {
            const initialState: iUser[] = [];
            const newState = userReducer(
                initialState,
                ac.loadUserAction([mockUser])
            );

            expect(newState).toHaveLength(1);
            expect(newState).toStrictEqual([mockUser]);
        });
    });

    describe("When createUserAction ", () => {
        test("Then it shoul be add newUser", () => {
            const initialState: iUser[] = [mockUser];
            const newUser = { ...mockUser, _id: "2", userName: "pepee" };
            const newState = userReducer(
                initialState,
                ac.createUserAction(newUser)
            );

            expect(newState).toHaveLength(2);
            expect(newState).toStrictEqual([mockUser, newUser]);
        });
    });

    describe("When modifyUserAction ", () => {
        test("Then it shoul be modify mockUser", () => {
            const initialState: iUser[] = [mockUser];
            const modifyUser = { ...mockUser, userName: "pepee" };
            const newState = userReducer(
                initialState,
                ac.modifyUserAction(modifyUser)
            );

            expect(newState).toHaveLength(1);
            expect(newState).toStrictEqual([modifyUser]);
        });
        test("If it not modify, then it shoul be not modify mockUser", () => {
            const initialState: iUser[] = [mockUser];
            const modifyUser = { ...mockUser, _id: "3" };
            const newState = userReducer(
                initialState,
                ac.modifyUserAction(modifyUser)
            );

            expect(newState).toHaveLength(1);
            expect(newState).toStrictEqual([mockUser]);
        });
    });

    describe("When deleteUserAction ", () => {
        test("Then it shoul be delete mockUser", () => {
            const initialState: iUser[] = [mockUser];

            const newState = userReducer(
                initialState,
                ac.deleteUserAction(mockUser)
            );

            expect(newState).toHaveLength(0);
            expect(newState).toStrictEqual([]);
        });
    });
});
