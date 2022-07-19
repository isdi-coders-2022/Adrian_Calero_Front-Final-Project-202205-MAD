import { useDispatch } from "react-redux";
import { BrowserRouter, useParams } from "react-router-dom";
import { profesionalReducer } from "../../redux/profesional-reducer/action.reducer";
import { reviewReducer } from "../../redux/review-reducer/action.reducer";
import { userReducer } from "../../redux/user-reducer/action.reducer";
import { LocalStorage } from "../../services/localStorage";
import { render, screen } from "../../services/test.utils";
import { Comment } from "./comment";

const reducer = {
    profesional: profesionalReducer,
    review: reviewReducer,
    user: userReducer,
};

jest.mock("../../services/localStorage");

jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useParams: jest.fn(),
}));

const mockReview = {
    _id: "62c41bec8bfe11181f9ebf54",
    worker: "62c41172eb20556e8d48e754",
    client: "62c40a97add2c6f044fc6874",
    reviews: {
        comment: "Guapo",
        score: 5,
    },
};
const preloadedState = {
    user: {},
    profesional: [],
    review: [mockReview, mockReview],
};
const login = { token: "1" };

const useDispatchMock = useDispatch as jest.Mock;

describe("Given the component Comment", () => {
    beforeEach(() => {
        useDispatchMock.mockReturnValue({});
        (useParams as jest.Mock).mockReturnValue({
            id: "62c41172eb20556e8d48e754",
        });
        LocalStorage.prototype.getItem = jest.fn().mockResolvedValue(login);
    });
    describe("When I render the component", () => {
        test("Then it should be rendered", () => {
            render(
                <BrowserRouter>
                    <Comment />
                </BrowserRouter>,
                { preloadedState, reducer }
            );

            expect(screen.getByText(/reviews/i)).toBeInTheDocument();
        });
    });
});
