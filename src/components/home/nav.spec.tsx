import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../store/store";
import { NavIcons } from "./nav";

describe("Given the component NavIcons", () => {
    describe("When i render the buttons", () => {
        test("Then it should be render all buttons", () => {
            render(
                <Provider store={store}>
                    <NavIcons />
                </Provider>
            );

            expect(screen.getAllByRole("button")).toHaveLength(6);
        });
    });
});
