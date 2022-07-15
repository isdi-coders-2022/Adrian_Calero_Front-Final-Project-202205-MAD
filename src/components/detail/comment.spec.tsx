import { Provider, useDispatch, useSelector } from "react-redux";
import { BrowserRouter, useParams } from "react-router-dom";
import { iLogin, iProfesional } from "../../interfaces/interfaces";
import { Review } from "../../models/review.model";
import { HttpReview } from "../../services/http.review";
import { LocalStorage } from "../../services/localStorage";
import { render, screen } from "../../services/test.utils";
import { store } from "../../store/store";
import { Comment } from "./comment";

const preloadedState = {
    user: {} as iLogin,
    profesional: [] as Array<iProfesional>,
    review: [] as Array<Review>,
};

jest.mock("../../services/localStorage");

jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useSelector: jest.fn(),
    useDispatch: jest.fn(),
}));
// jest.mock("../../services/http.review");
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
const login = { token: "1" };
const useSelectorMock = useSelector as jest.Mock;
const useDispatchMock = useDispatch as jest.Mock;

describe("Given the component ListProfesional", () => {
    beforeEach(() => {
        useSelectorMock.mockReturnValue([mockReview]);
        useDispatchMock.mockReturnValue({});
        (useParams as jest.Mock).mockReturnValue({
            id: "62c41172eb20556e8d48e754",
        });
        LocalStorage.prototype.getItem = jest.fn().mockResolvedValue(login);
        // HttpReview.prototype.getAllInProfesionals = jest
        //     .fn()
        //     .mockReturnValue([mockReview]);
    });
    describe("When I render the component", () => {
        test("Then it should be rendered", () => {
            render(
                <Provider store={store}>
                    <BrowserRouter>
                        <Comment />
                    </BrowserRouter>
                </Provider>,
                { preloadedState, store }
            );

            expect(screen.getByText(/reviews/i)).toBeInTheDocument();
        });
    });
});
