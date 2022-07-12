import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { iLogin, iProfesional } from "../../interfaces/interfaces";
import { Review } from "../../models/review.model";
import { HttpUser } from "../../services/http.user";
import { LocalStorage } from "../../services/localStorage";
import { fireEvent, render, screen } from "../../services/test.utils";
import { store } from "../../store/store";
import { Form } from "./form";
import * as firebase from "firebase/storage";

jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useNavigate: jest.fn(),
}));
jest.mock("../../services/localStorage");
jest.mock("../../services/http.user");
jest.mock("firebase/storage");
const preloadedState = {
    user: {} as iLogin,
    profesional: [] as Array<iProfesional>,
    review: [] as Array<Review>,
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
                <Provider store={store}>
                    <BrowserRouter>
                        <Form />
                    </BrowserRouter>
                </Provider>
            );

            expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
        });
    });

    describe("When i click the button Register", () => {
        test("Then it should be called the api fetch", () => {
            render(
                <Provider store={store}>
                    <BrowserRouter>
                        <Form />
                    </BrowserRouter>
                </Provider>,
                { preloadedState, store }
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
        });
    });

    describe("When i change the input text", () => {
        test("Then it should be changed", () => {
            render(
                <Provider store={store}>
                    <BrowserRouter>
                        <Form />
                    </BrowserRouter>
                </Provider>,
                { preloadedState, store }
            );
            const input = screen.getByLabelText(/Username/i) as HTMLFormElement;
            fireEvent.change(input, { target: { value: "name" } });

            expect(input).toHaveValue("name");
        });
    });
});
