import { Provider, useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { iLogin, iProfesional } from "../../interfaces/interfaces";
import { Review } from "../../models/review.model";
import { HttpReview } from "../../services/http.review";
import { LocalStorage } from "../../services/localStorage";
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
const login = { token: "1" };
describe("Given the component ListProfesional", () => {
    beforeEach(() => {
        useSelectorMock.mockReturnValue([mockProfesional]);
        LocalStorage.prototype.getItem = jest.fn().mockResolvedValue(login);
        HttpReview.prototype.getAllInProfesionals = jest
            .fn()
            .mockResolvedValue([
                { reviews: { score: 1 } },
                { reviews: { score: 2 } },
            ]);
        Promise.all = jest.fn().mockResolvedValue([
            {
                accum: 1,
                total: 1,
                prof: {
                    _id: "1",
                    name: "jose",
                    avatar: "url",
                    profesion: "arquitect",
                    info: { price: 5 },
                },
            },
            {
                accum: 1,
                total: 1,
                prof: {
                    _id: "2",
                    name: "antonio",
                    avatar: "url",
                    profesion: "arquitect",
                    info: { price: 5 },
                },
            },
        ]);
    });
    describe("When I render the component", () => {
        test("Then it should be rendered", async () => {
            render(
                <Provider store={store}>
                    <BrowserRouter>
                        <ListProfesional
                            type={"arquitect"}
                            search={"j"}
                            order={"price+"}
                        />
                    </BrowserRouter>
                </Provider>,
                { preloadedState, store }
            );

            expect(await screen.findByAltText(/jose/i)).toBeInTheDocument();
        });
    });
});
