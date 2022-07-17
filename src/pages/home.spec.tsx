import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { LocalStorage } from "../services/localStorage";
import { store } from "../store/store";
import { Home } from "./home";

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
                        <Home />
                    </BrowserRouter>
                </Provider>
            );

            expect(
                screen.getByText(/Fix your problems with solucions/i)
            ).toBeInTheDocument();
        });
    });
});
