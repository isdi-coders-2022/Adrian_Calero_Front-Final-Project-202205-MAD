import { BrowserRouter, useNavigate } from "react-router-dom";
import { userReducer } from "../../redux/user-reducer/action.reducer";
import { HttpUser } from "../../services/http.user";
import { LocalStorage } from "../../services/localStorage";
import { fireEvent, render, screen } from "../../services/test.utils";
import { FormUpdate } from "./form";
import * as firebase from "firebase/storage";

const navigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(),
}));
jest.mock("firebase/storage");
const reducer = {
    user: userReducer,
};
jest.mock("../../services/http.user");

const preloadedState = {
    user: {
        _id: "1",
        avatar: "url",
        userName: "test",
        email: "test@test.com",
        favorites: [],
    },
};

describe("Given the component FormUpdate", () => {
    beforeEach(() => {
        HttpUser.prototype.updateUser = jest.fn().mockResolvedValue({});
        HttpUser.prototype.deleteUser = jest.fn().mockReturnValue(200);
        LocalStorage.prototype.removeItem = jest.fn().mockReturnValue(null);
        jest.spyOn(firebase, "uploadBytes").mockImplementation(
            () =>
                new Promise((resolve) => {
                    resolve({} as firebase.UploadResult);
                })
        );
        jest.spyOn(firebase, "getDownloadURL").mockImplementation(
            () =>
                new Promise((resolve) => {
                    resolve("");
                })
        );
    });
    describe("When i render the component", () => {
        test("Then it should be rendered", () => {
            render(
                <BrowserRouter>
                    <FormUpdate />
                </BrowserRouter>,
                { preloadedState, reducer }
            );

            expect(
                screen.getByLabelText(/Change your avatar:/i)
            ).toBeInTheDocument();
        });
    });

    describe("When i press the button back", () => {
        test("Then it should be call navigate", () => {
            (useNavigate as jest.Mock).mockReturnValue(navigate);
            render(
                <BrowserRouter>
                    <FormUpdate />
                </BrowserRouter>,
                { preloadedState, reducer }
            );
            const button = screen.getByTestId("back-button");

            fireEvent.click(button);

            expect(navigate).toHaveBeenCalled();
        });
    });

    describe("When i change a input", () => {
        test("Then it should be changed", () => {
            render(
                <BrowserRouter>
                    <FormUpdate />
                </BrowserRouter>,
                { preloadedState, reducer }
            );
            const input = screen.getByLabelText("Change your Username:");

            fireEvent.change(input, { target: { value: "name" } });

            expect(input).toHaveValue("name");
        });
    });

    describe("When i charge a file", () => {
        test("Then it should be charged", async () => {
            const someValues = [{ name: "teresa teng" }];
            const str = JSON.stringify(someValues);

            const blob = new Blob([str]);
            const file = new File([blob], "values.json", {
                type: "application/JSON",
            });
            render(
                <BrowserRouter>
                    <FormUpdate />
                </BrowserRouter>,
                { preloadedState, reducer }
            );
            const input = screen.getByLabelText("Change your Avatar:");

            fireEvent.change(input, { target: { files: [file] } });
            const check = await screen.findByTestId("check");

            expect(check).toBeInTheDocument();
        });
    });

    describe("When i click the button submit", () => {
        test("Then it should be call a function", async () => {
            (useNavigate as jest.Mock).mockReturnValue(navigate);

            render(
                <BrowserRouter>
                    <FormUpdate />
                </BrowserRouter>,
                { preloadedState, reducer }
            );
            const button = screen.getByText(/update/i);

            fireEvent.click(button);

            expect(navigate).toHaveBeenCalled();
        });
    });

    describe("When i click the button delete", () => {
        test("Then it should be call a function", async () => {
            (useNavigate as jest.Mock).mockReturnValue(navigate);

            render(
                <BrowserRouter>
                    <FormUpdate />
                </BrowserRouter>,
                { preloadedState, reducer }
            );
            const button = screen.getByText(/delete/i);

            fireEvent.click(button);

            expect(navigate).toHaveBeenCalled();
        });
    });
});
