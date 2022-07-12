import { render, screen } from "@testing-library/react";
import * as redux from "react-redux";
import { iLogin } from "../../interfaces/interfaces";
import { LocalStorage } from "../../services/localStorage";
import { store } from "../../store/store";
import { HeaderHome } from "./header";

jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useSelector: jest.fn(),
}));

describe("Given the component header", () => {
    const mocklogin: iLogin = {
        token: "1",
        user: {
            userName: "test",
            email: "test@test.com",
            passwd: "1234",
            favorites: [],
        },
    };

    beforeEach(() => {
        (redux.useSelector as jest.Mock).mockImplementation((callback) => {
            return callback(mocklogin);
        });

        LocalStorage.prototype.getItem = jest
            .fn()
            .mockReturnValue({ user: { userName: "test" } });
    });
    describe("When i render the component", () => {
        test("Then it should be render", () => {
            render(
                <redux.Provider store={store}>
                    <HeaderHome />
                </redux.Provider>
            );

            expect(screen.getByText(/your solution/i)).toBeInTheDocument();
        });
        test("Then it should be render with avatar", () => {
            LocalStorage.prototype.getItem = jest
                .fn()
                .mockReturnValue({ user: { avatar: "url", userName: "test" } });

            render(
                <redux.Provider store={store}>
                    <HeaderHome />
                </redux.Provider>
            );

            expect(screen.getByAltText(/test/i)).toBeInTheDocument();
        });
    });
});
