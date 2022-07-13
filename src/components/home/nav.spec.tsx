import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../store/store";
import { NavIcons } from "./nav";

describe("Given the component NavIcons", () => {
    describe("When i render the buttons", () => {
        test("Then it should be render all buttons", () => {
            render(
                <Provider store={store}>
                    <BrowserRouter>
                        <NavIcons />
                    </BrowserRouter>
                </Provider>
            );

            expect(screen.getByText(/Electrician/i)).toBeInTheDocument();
        });
    });
});
