import { Provider, useSelector } from "react-redux";
import { BrowserRouter, useNavigate, useParams } from "react-router-dom";
import { iLogin, iProfesional } from "../../interfaces/interfaces";
import { Review } from "../../models/review.model";
import { fireEvent, render, screen } from "../../services/test.utils";
import { store } from "../../store/store";
import { CardDetail } from "./card";

const preloadedState = {
    user: {} as iLogin,
    profesional: [] as Array<iProfesional>,
    review: [] as Array<Review>,
};

jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useSelector: jest.fn(),
}));

const mockedNavigator = jest.fn();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useParams: jest.fn(),
    useNavigate: () => mockedNavigator,
}));

const mockProfesional = {
    _id: "62cef4271854336fe7fe777f",
    avatar: "https://firebasestorage.googleapis.com/v0/b/proyect-files.appspot.com/...",
    name: "Jose",
    profesion: "arquitect",
    info: {
        description:
            "Construction companies, but they can also be self-employed individuals...",
        price: 30,
        img: "",
        video: "https://firebasestorage.googleapis.com/v0/b/proyect-files.appspot.com/...",
    },
};

describe("Given the component CardDetail", () => {
    beforeEach(() => {
        (useSelector as jest.Mock).mockReturnValue([mockProfesional]);
    });
    describe("When I render the component", () => {
        test("Then it should be rendered", () => {
            (useParams as jest.Mock).mockReturnValue({
                id: "62cef4271854336fe7fe777f",
            });
            render(
                <Provider store={store}>
                    <BrowserRouter>
                        <CardDetail />
                    </BrowserRouter>
                </Provider>,
                { store, preloadedState }
            );

            expect(screen.getByAltText(/jose/i)).toBeInTheDocument();
        });
    });

    describe("When I click the button", () => {
        test("Then it should be call navigate", () => {
            (useParams as jest.Mock).mockReturnValue({
                id: "62cef4271854336fe7fe777f",
            });
            render(
                <Provider store={store}>
                    <BrowserRouter>
                        <CardDetail />
                    </BrowserRouter>
                </Provider>,
                { store, preloadedState }
            );
            const button = screen.getByRole("button");
            fireEvent.click(button, { profesion: "arquitect" });

            expect(mockedNavigator).toHaveBeenCalled();
        });
    });
});
