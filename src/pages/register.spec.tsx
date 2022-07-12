import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { LocalStorage } from "../services/localStorage";
import { store } from "../store/store";
import Register from "./register";

describe("Given the component Home", () => {
    beforeEach(() => {
        LocalStorage.prototype.getItem = jest
            .fn()
            .mockReturnValue({ user: { userName: "test" } });
    });

    describe("When i render the component", () => {
        test("Then it should be rendered", () => {
            render(
                <Provider store={store}>
                    <BrowserRouter>
                        <Register />
                    </BrowserRouter>
                </Provider>
            );

            expect(screen.getByText(/fix/i)).toBeInTheDocument();
        });
    });
});
