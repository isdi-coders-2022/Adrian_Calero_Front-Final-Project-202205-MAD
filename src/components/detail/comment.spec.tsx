import { BrowserRouter, useParams } from "react-router-dom";
import { profesionalReducer } from "../../redux/profesional-reducer/action.reducer";
import { reviewReducer } from "../../redux/review-reducer/action.reducer";
import { userReducer } from "../../redux/user-reducer/action.reducer";
import { HttpReview } from "../../services/http.review";
import { LocalStorage } from "../../services/localStorage";
import { fireEvent, render, screen } from "../../services/test.utils";
import { Comment } from "./comment";

const reducer = {
    profesional: profesionalReducer,
    review: reviewReducer,
    user: userReducer,
};
jest.mock("../../services/http.review");
jest.mock("../../services/localStorage");

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
const login = { token: "1", id: "62c40a97add2c6f044fc6874" };

describe("Given the component Comment", () => {
    beforeEach(() => {
        (useParams as jest.Mock).mockReturnValue({
            id: "62c41172eb20556e8d48e754",
        });
        LocalStorage.prototype.getItem = jest.fn().mockResolvedValue(login);
        HttpReview.prototype.getAllInProfesionals = jest
            .fn()
            .mockResolvedValue([mockReview]);
        HttpReview.prototype.addReview = jest.fn().mockResolvedValue({
            ...mockReview,
            reviews: { comment: "testing" },
        });
        HttpReview.prototype.deleteReview = jest.fn().mockResolvedValue({});
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

    describe("When I click the button comment", () => {
        test("Then the dialog opened", () => {
            render(
                <BrowserRouter>
                    <Comment />
                </BrowserRouter>,
                { preloadedState, reducer }
            );

            const button = screen.getByTestId(/comment-open/i);
            fireEvent.click(button);

            expect(screen.getByText(/send/i)).toBeInTheDocument();
        });
    });

    describe("When I click the button send", () => {
        test("Then it should be comment", () => {
            render(
                <BrowserRouter>
                    <Comment />
                </BrowserRouter>,
                { preloadedState, reducer }
            );

            const button = screen.getByTestId(/comment-open/i);
            fireEvent.click(button);

            const buttonSend = screen.getByText(/send/i);
            fireEvent.click(buttonSend);

            expect(HttpReview.prototype.addReview).toHaveBeenCalled();
        });
    });

    describe("When I click the button X", () => {
        test("Then it should be delete de comment", () => {
            render(
                <BrowserRouter>
                    <Comment />
                </BrowserRouter>,
                { preloadedState, reducer }
            );

            const button = screen.getAllByTestId(/cross-comment/i);
            fireEvent.click(button[0]);

            expect(HttpReview.prototype.deleteReview).toHaveBeenCalled();
        });
    });
    describe("When I click the button comment and change an input", () => {
        test("Then the input it should be change", () => {
            render(
                <BrowserRouter>
                    <Comment />
                </BrowserRouter>,
                { preloadedState, reducer }
            );

            const button = screen.getByTestId(/comment-open/i);
            fireEvent.click(button);

            const textArea = screen.getByRole("textbox");
            fireEvent.change(textArea, { target: { value: "test" } });

            expect(textArea).toHaveValue("test");
        });
    });

    describe("When I click the button comment and click the X", () => {
        test("Then the dialog should be closed", () => {
            render(
                <BrowserRouter>
                    <Comment />
                </BrowserRouter>,
                { preloadedState, reducer }
            );

            const button = screen.getByTestId(/comment-open/i);
            fireEvent.click(button);

            const x = screen.getByTestId("cross-close");
            fireEvent.click(x);

            expect(screen.getByText(/send/i)).toBeInTheDocument();
        });
    });
});
