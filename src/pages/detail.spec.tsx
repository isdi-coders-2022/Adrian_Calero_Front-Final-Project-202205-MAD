import { render, screen } from "@testing-library/react";
import { Provider, useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { LocalStorage } from "../services/localStorage";
import { store } from "../store/store";
import Detail from "./detail";

jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useSelector: jest.fn(),
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

describe("Given the page detail", () => {
    beforeEach(() => {
        (useSelector as jest.Mock).mockReturnValue([mockProfesional]);
    });
    describe("When i render the page", () => {
        test("Then it should be rendered", () => {
            (useSelector as jest.Mock).mockReturnValue([
                { reviews: { score: 1 } },
            ]);
            render(
                <Provider store={store}>
                    <BrowserRouter>
                        <Detail />
                    </BrowserRouter>
                </Provider>
            );

            expect(screen.getByAltText(/jose/i)).toBeInTheDocument();
        });
    });
});
