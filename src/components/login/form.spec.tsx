import { BrowserRouter } from "react-router-dom";
import { HttpUser } from "../../services/http.user";
import { LocalStorage } from "../../services/localStorage";
import { fireEvent, render, screen } from "../../services/test.utils";
import { FormLogin } from "./form";
import * as reactRedux from "react-redux";
import { profesionalReducer } from "../../redux/profesional-reducer/action.reducer";
import { reviewReducer } from "../../redux/review-reducer/action.reducer";
import { userReducer } from "../../redux/user-reducer/action.reducer";

jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useNavigate: jest.fn(),
}));

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
            const mockUseDispatch = jest.spyOn(reactRedux, "useDispatch");
            render(
                <BrowserRouter>
                    <FormLogin />
                </BrowserRouter>,
                { preloadedState, reducer }
            );

            fireEvent.click(screen.getByText(/login/i));

            expect(mockUseDispatch).toHaveBeenCalled();
        });

        test("Then it should be call the error", () => {
            HttpUser.prototype.loginUser = jest.fn().mockResolvedValue({
                token: undefined,
                user: { userName: "test" },
            });
            const mockUseDispatch = jest.spyOn(reactRedux, "useDispatch");
            render(
                <BrowserRouter>
                    <FormLogin />
                </BrowserRouter>,
                { preloadedState, reducer }
            );

            fireEvent.click(screen.getByText(/login/i));

            expect(mockUseDispatch).toHaveBeenCalled();
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
});
