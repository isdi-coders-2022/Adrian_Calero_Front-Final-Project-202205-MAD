import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../store/store";
import { FooterHome } from "./footer";

describe("Given the component NavIcons", () => {
    describe("When i render the buttons", () => {
        test("Then it should be render all buttons", () => {
            render(
                <Provider store={store}>
                    <FooterHome />
                </Provider>
            );

            expect(screen.getAllByRole("button")).toHaveLength(1);
        });
    });
});
