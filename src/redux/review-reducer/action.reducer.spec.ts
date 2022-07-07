import { iReview } from "../../interfaces/interfaces";
import { reviewReducer } from "./action.reducer";
import * as ac from "./action.creator";

describe("Given de user redux", () => {
    const mockReview: iReview = {
        _id: "1",
        worker: {
            avatar: "url",
            name: "test1",
            profesion: "test",
            info: { description: "test", price: 1, img: "url", video: "url" },
        },
        client: {
            avatar: "url",
            userName: "test2",
            email: "test@test.com",
            passwd: "1234",
            favorites: [],
        },
        date: "1-01-1111",
        reviews: [{ img: [], video: [], comment: "test", score: 5 }],
    };
    describe("When loadReviewAction", () => {
        test("Then it shoul render user mock", () => {
            const initialState: iReview[] = [];
            const newState = reviewReducer(
                initialState,
                ac.loadReviewAction([mockReview])
            );

            expect(newState).toHaveLength(1);
            expect(newState).toStrictEqual([mockReview]);
        });
    });

    describe("When createReviewAction", () => {
        test("Then it shoul be add newUser", () => {
            const initialState: iReview[] = [mockReview];
            const newUser = { ...mockReview, _id: "2", date: "2-2-2222" };
            const newState = reviewReducer(
                initialState,
                ac.createReviewAction(newUser)
            );

            expect(newState).toHaveLength(2);
            expect(newState).toStrictEqual([mockReview, newUser]);
        });
    });

    describe("When modifyReviewAction", () => {
        test("Then it shoul be modify mockUser", () => {
            const initialState: iReview[] = [mockReview];
            const modifyUser = { ...mockReview, date: "3-3-3333" };
            const newState = reviewReducer(
                initialState,
                ac.modifyReviewAction(modifyUser)
            );

            expect(newState).toHaveLength(1);
            expect(newState).toStrictEqual([modifyUser]);
        });
        test("If it not modify, then it shoul be not modify mockUser", () => {
            const initialState: iReview[] = [mockReview];
            const modifyUser = { ...mockReview, _id: "3" };
            const newState = reviewReducer(
                initialState,
                ac.modifyReviewAction(modifyUser)
            );

            expect(newState).toHaveLength(1);
            expect(newState).toStrictEqual([mockReview]);
        });
    });

    describe("When deleteReviewAction", () => {
        test("Then it shoul be delete mockUser", () => {
            const initialState: iReview[] = [mockReview];

            const newState = reviewReducer(
                initialState,
                ac.deleteReviewAction(mockReview)
            );

            expect(newState).toHaveLength(0);
            expect(newState).toStrictEqual([]);
        });
    });
});
