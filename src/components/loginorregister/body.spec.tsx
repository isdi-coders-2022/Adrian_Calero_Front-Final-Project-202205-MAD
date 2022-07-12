import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../store/store";
import { ButtonsLoginOrRegister } from "./body";

describe("Given the component ButtonsLoginOrRegister", () => {
    describe("When the component is rendered", () => {
        test("Then it should be render", () => {
            render(
                <Provider store={store}>
                    <BrowserRouter>
                        <ButtonsLoginOrRegister />
                    </BrowserRouter>
                </Provider>
            );

            expect(screen.getAllByRole("button")).toHaveLength(2);
        });
    });
});
