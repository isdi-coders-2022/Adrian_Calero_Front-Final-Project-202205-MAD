import { Provider, useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { iLogin, iProfesional } from "../../interfaces/interfaces";
import { Review } from "../../models/review.model";
import { render, screen } from "../../services/test.utils";
import { store } from "../../store/store";
import { ListProfesional } from "./list";

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
const preloadedState = {
    user: {} as iLogin,
    profesional: [] as Array<iProfesional>,
    review: [] as Array<Review>,
};

const useSelectorMock = useSelector as jest.Mock;

describe("Given the component ListProfesional", () => {
    beforeEach(() => useSelectorMock.mockReturnValue([mockProfesional]));
    describe("When I render the component", () => {
        test("Then it should be rendered", () => {
            render(
                <Provider store={store}>
                    <BrowserRouter>
                        <ListProfesional type={"arquitect"} search={""} />
                    </BrowserRouter>
                </Provider>,
                { preloadedState, store }
            );

            expect(screen.getByAltText(/jose/i)).toBeInTheDocument();
        });
    });
});
