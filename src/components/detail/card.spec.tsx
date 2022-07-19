import { BrowserRouter, useNavigate, useParams } from "react-router-dom";

import { profesionalReducer } from "../../redux/profesional-reducer/action.reducer";
import { fireEvent, render, screen } from "../../services/test.utils";
import { CardDetail } from "./card";

const reducer = {
    profesional: profesionalReducer,
};

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
const preloadedState = {
    profesional: [mockProfesional],
};
describe("Given the component CardDetail", () => {
    beforeEach(() => {});
    describe("When I render the component", () => {
        test("Then it should be rendered", () => {
            (useParams as jest.Mock).mockReturnValue({
                id: "62cef4271854336fe7fe777f",
            });
            render(
                <BrowserRouter>
                    <CardDetail />
                </BrowserRouter>,

                { preloadedState, reducer }
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
                <BrowserRouter>
                    <CardDetail />
                </BrowserRouter>,
                { preloadedState, reducer }
            );
            const button = screen.getByRole("button");
            fireEvent.click(button, { profesion: "arquitect" });

            expect(mockedNavigator).toHaveBeenCalled();
        });
    });
});
