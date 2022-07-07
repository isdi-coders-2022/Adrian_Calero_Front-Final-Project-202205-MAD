import { iProfesional } from "../../interfaces/interfaces";
import { profesionalReducer } from "./action.reducer";
import * as ac from "./action.creator";

describe("Given de user redux", () => {
    const mockProfesional: iProfesional = {
        _id: "1",
        avatar: "url",
        name: "test",
        profesion: "test",
        info: { description: "test", price: 1, img: "url", video: "url" },
    };
    describe("When loadUserAction ", () => {
        test("Then it shoul render user mock", () => {
            const initialState: iProfesional[] = [];
            const newState = profesionalReducer(
                initialState,
                ac.loadProfesionalAction([mockProfesional])
            );

            expect(newState).toHaveLength(1);
            expect(newState).toStrictEqual([mockProfesional]);
        });
    });
});
