import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { iLogin, iProfesional } from "../../interfaces/interfaces";
import { Review } from "../../models/review.model";
import { HttpUser } from "../../services/http.user";
import { LocalStorage } from "../../services/localStorage";
import { fireEvent, render, screen } from "../../services/test.utils";
import { store } from "../../store/store";
import { FormLogin } from "./form";
import * as reactRedux from "react-redux";

jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useNavigate: jest.fn(),
}));

jest.mock("../../services/localStorage");
jest.mock("../../services/http.user");
const preloadedState = {
    user: {} as iLogin,
    profesional: [] as Array<iProfesional>,
    review: [] as Array<Review>,
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
                <Provider store={store}>
                    <BrowserRouter>
                        <FormLogin />
                    </BrowserRouter>
                </Provider>
            );

            expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
        });
    });

    describe("When i click the button Login", () => {
        test("Then it should be called with token the dispatch", () => {
            const mockUseDispatch = jest.spyOn(reactRedux, "useDispatch");
            render(
                <Provider store={store}>
                    <BrowserRouter>
                        <FormLogin />
                    </BrowserRouter>
                </Provider>,
                { preloadedState, store }
            );

            fireEvent.click(screen.getByText(/login/i));

            expect(mockUseDispatch).toHaveBeenCalled();
        });

        test("Then it should be call the error", () => {
            HttpUser.prototype.loginUser = jest
                .fn()
                .mockResolvedValue({
                    token: undefined,
                    user: { userName: "test" },
                });
            const mockUseDispatch = jest.spyOn(reactRedux, "useDispatch");
            render(
                <Provider store={store}>
                    <BrowserRouter>
                        <FormLogin />
                    </BrowserRouter>
                </Provider>,
                { preloadedState, store }
            );

            fireEvent.click(screen.getByText(/login/i));

            expect(mockUseDispatch).toHaveBeenCalled();
        });
    });

    describe("When i change the input text", () => {
        test("Then it should be changed", () => {
            render(
                <Provider store={store}>
                    <BrowserRouter>
                        <FormLogin />
                    </BrowserRouter>
                </Provider>,
                { preloadedState, store }
            );
            const input = screen.getByLabelText(/Username/i) as HTMLFormElement;
            fireEvent.change(input, { target: { value: "name" } });

            expect(input).toHaveValue("name");
        });
    });
});
