import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../store/store";
import Login from "./login";

describe("Given the component Home", () => {
    describe("When i render the component", () => {
        test("Then it should be rendered", () => {
            render(
                <Provider store={store}>
                    <BrowserRouter>
                        <Login />
                    </BrowserRouter>
                </Provider>
            );

            expect(screen.getByText(/fix/i)).toBeInTheDocument();
        });
    });
});
