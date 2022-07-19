import { BrowserRouter, useNavigate } from "react-router-dom";
import { HttpUser } from "../../services/http.user";
import { LocalStorage } from "../../services/localStorage";
import { fireEvent, render, screen } from "../../services/test.utils";
import { FormLogin } from "./form";
import { profesionalReducer } from "../../redux/profesional-reducer/action.reducer";
import { reviewReducer } from "../../redux/review-reducer/action.reducer";
import { userReducer } from "../../redux/user-reducer/action.reducer";
import sweetalert2 from "sweetalert2";

const navigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(),
}));
jest.mock("sweetalert2");

const reducer = {
    profesional: profesionalReducer,
    review: reviewReducer,
    user: userReducer,
};

jest.mock("../../services/localStorage");
jest.mock("../../services/http.user");
const preloadedState = {
    user: {},
    profesional: [],
    review: [],
};

describe("Given the component FormLogin", () => {
    beforeEach(() => {
        HttpUser.prototype.loginUser = jest
            .fn()
            .mockResolvedValue({ token: "1", user: { userName: "test" } });
        LocalStorage.prototype.setItem = jest.fn().mockResolvedValue({});
    });
    describe("When i render the component", () => {
        test("Then it should be rendered", () => {
            render(
                <BrowserRouter>
                    <FormLogin />
                </BrowserRouter>,
                { preloadedState, reducer }
            );

            expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
        });
    });
    describe("When i click the button Login", () => {
        test("Then it should be called with token the dispatch", () => {
            (useNavigate as jest.Mock).mockReturnValue(navigate);

            render(
                <BrowserRouter>
                    <FormLogin />
                </BrowserRouter>,
                { preloadedState, reducer }
            );

            fireEvent.click(screen.getByText(/login/i));

            expect(HttpUser).toHaveBeenCalled();
        });

        test("Then it should be call the error", () => {
            (useNavigate as jest.Mock).mockReturnValue(navigate);
            HttpUser.prototype.loginUser = jest.fn().mockResolvedValue({
                token: undefined,
                user: { userName: "test" },
            });
            sweetalert2.fire = jest.fn();
            render(
                <BrowserRouter>
                    <FormLogin />
                </BrowserRouter>,
                { preloadedState, reducer }
            );

            fireEvent.click(screen.getByText(/login/i));
            expect(screen.getAllByRole("textbox")).toHaveLength(1);
        });
    });

    describe("When i change the input text", () => {
        test("Then it should be changed", () => {
            render(
                <BrowserRouter>
                    <FormLogin />
                </BrowserRouter>,
                { preloadedState, reducer }
            );
            const input = screen.getByLabelText(/Username/i) as HTMLFormElement;
            fireEvent.change(input, { target: { value: "name" } });

            expect(input).toHaveValue("name");
        });
    });

    describe("When i click the button back", () => {
        test("Then it should call navigate", () => {
            (useNavigate as jest.Mock).mockReturnValue(navigate);
            render(
                <BrowserRouter>
                    <FormLogin />
                </BrowserRouter>,
                { preloadedState, reducer }
            );
            const button = screen.getByTestId(/back-login/i);
            fireEvent.click(button);

            expect(navigate).toHaveBeenCalled();
        });
    });
});
