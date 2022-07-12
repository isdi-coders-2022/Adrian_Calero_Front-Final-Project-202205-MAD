import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../store/store";
import { BodyHome } from "./body";

describe("Given the component BodyHome", () => {
    describe("When the component is rendered", () => {
        test("Then it should  be render", () => {
            render(
                <Provider store={store}>
                    <BodyHome />
                </Provider>
            );

            expect(
                screen.getByText(/Fix your problems with solucions/i)
            ).toBeInTheDocument();
        });
    });
});
