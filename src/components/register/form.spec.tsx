import { BrowserRouter, useNavigate } from "react-router-dom";
import { HttpUser } from "../../services/http.user";
import { LocalStorage } from "../../services/localStorage";
import { fireEvent, render, screen } from "../../services/test.utils";
import { Form } from "./form";
import * as firebase from "firebase/storage";
import { profesionalReducer } from "../../redux/profesional-reducer/action.reducer";
import { reviewReducer } from "../../redux/review-reducer/action.reducer";
import { userReducer } from "../../redux/user-reducer/action.reducer";

const navigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(),
}));

jest.mock("../../services/localStorage");
jest.mock("../../services/http.user");
jest.mock("firebase/storage");

const reducer = {
    profesional: profesionalReducer,
    review: reviewReducer,
    user: userReducer,
};

const preloadedState = {
    user: {},
    profesional: [],
    review: [],
};

const someValues = [{ name: "teresa teng" }];

describe("Given the component Form", () => {
    beforeEach(() => {
        HttpUser.prototype.registerUser = jest.fn().mockResolvedValue({});
        LocalStorage.prototype.getItem = jest.fn().mockResolvedValue({});
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

    describe("When I render the component", () => {
        test("Then it should be rendered", () => {
            render(
                <BrowserRouter>
                    <Form />
                </BrowserRouter>,
                { preloadedState, reducer }
            );

            expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
        });
    });

    describe("When i click the button Register", () => {
        test("Then it should be called the api fetch", async () => {
            (useNavigate as jest.Mock).mockReturnValue(navigate);
            render(
                <BrowserRouter>
                    <Form />
                </BrowserRouter>,
                { preloadedState, reducer }
            );
            const str = JSON.stringify(someValues);

            const blob = new Blob([str]);
            const file = new File([blob], "values.json", {
                type: "application/JSON",
            });
            const input = screen.getByTestId("fileupload");
            fireEvent.change(input, { target: { files: [file] } });

            const userName = screen.getByLabelText(
                /Username/
            ) as HTMLFormElement;
            fireEvent.change(userName, { target: { value: "name" } });

            const Email = screen.getByLabelText(/Email/) as HTMLFormElement;
            fireEvent.change(Email, { target: { value: "test@test.com" } });

            const Password = screen.getByLabelText(
                /Password/
            ) as HTMLFormElement;
            fireEvent.change(Password, { target: { value: "1234" } });

            fireEvent.click(screen.getByText(/Register/i));

            expect(HttpUser).toHaveBeenCalled();
            expect(await screen.findByTestId("check")).toBeInTheDocument();
        });
    });

    describe("When i change the input text", () => {
        test("Then it should be changed", () => {
            render(
                <BrowserRouter>
                    <Form />
                </BrowserRouter>,
                { preloadedState, reducer }
            );
            const input = screen.getByLabelText(/Username/i) as HTMLFormElement;
            fireEvent.change(input, { target: { value: "name" } });

            expect(input).toHaveValue("name");
        });
    });

    describe("When i click the button back", () => {
        test("Then it should be call navigate", async () => {
            (useNavigate as jest.Mock).mockReturnValue(navigate);
            render(
                <BrowserRouter>
                    <Form />
                </BrowserRouter>,
                { preloadedState, reducer }
            );
            const button = screen.getByTestId("back-register");
            fireEvent.click(button);

            expect(navigate).toHaveBeenCalled();
        });
    });
});
