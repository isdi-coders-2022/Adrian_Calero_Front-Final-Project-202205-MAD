import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { LocalStorage } from "../../services/localStorage";
import { store } from "../../store/store";
import { FooterHome } from "./footer";

describe("Given the component FooterHome", () => {
    beforeEach(() => {
        LocalStorage.prototype.getItem = jest.fn().mockReturnValue({});
        LocalStorage.prototype.removeItem = jest.fn();
    });
    describe("When i render the links", () => {
        test("Then it should be render all links", () => {
            render(
                <Provider store={store}>
                    <BrowserRouter>
                        <FooterHome />
                    </BrowserRouter>
                </Provider>
            );

            expect(screen.getAllByRole("link")).toHaveLength(2);
        });
    });

    describe("When i the link role button", () => {
        test("Then it should be call removeItem", async () => {
            render(
                <Provider store={store}>
                    <BrowserRouter>
                        <FooterHome />
                    </BrowserRouter>
                </Provider>
            );

            const button = await screen.findByRole("button");
            fireEvent.click(button);
            expect(LocalStorage.prototype.removeItem).toHaveBeenCalled();
        });
    });
});
