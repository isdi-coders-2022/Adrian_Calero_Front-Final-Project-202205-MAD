import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../store/store";
import RegisterOrLoginPage from "./registerorlogin";

describe("Given the component Home", () => {
    describe("When i render the component", () => {
        test("Then it should be rendered", () => {
            render(
                <Provider store={store}>
                    <BrowserRouter>
                        <RegisterOrLoginPage />
                    </BrowserRouter>
                </Provider>
            );

            expect(screen.getAllByRole("button")).toHaveLength(2);
        });
    });
});
