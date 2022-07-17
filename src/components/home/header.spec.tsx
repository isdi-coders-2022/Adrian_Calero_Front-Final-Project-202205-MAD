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
const login = { token: "1" };
describe("Given the component header", () => {
    const mockloginWithAvatar: iLogin = {
        token: "1",
        user: {
            avatar: "url",
            userName: "test",
            email: "test@test.com",
            passwd: "1234",
            favorites: [],
        },
    };

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
        LocalStorage.prototype.getItem = jest.fn().mockResolvedValue(login);
    });
    describe("When i render the component", () => {
        test("Then it should be render", () => {
            (redux.useSelector as jest.Mock).mockImplementation((callback) => {
                return callback(mocklogin);
            });
            render(
                <redux.Provider store={store}>
                    <HeaderHome />
                </redux.Provider>
            );

            expect(screen.getByText(/test/i)).toBeInTheDocument();
        });
        test("Then it should be render with avatar", () => {
            (redux.useSelector as jest.Mock).mockImplementation((callback) => {
                return callback(mockloginWithAvatar);
            });

            render(
                <redux.Provider store={store}>
                    <HeaderHome />
                </redux.Provider>
            );

            expect(screen.getByAltText(/test/i)).toBeInTheDocument();
        });
    });
});
