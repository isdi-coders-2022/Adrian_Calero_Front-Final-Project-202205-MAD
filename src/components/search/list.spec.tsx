import { BrowserRouter } from "react-router-dom";
import { profesionalReducer } from "../../redux/profesional-reducer/action.reducer";
import { reviewReducer } from "../../redux/review-reducer/action.reducer";
import { HttpReview } from "../../services/http.review";
import { LocalStorage } from "../../services/localStorage";
import { render, screen } from "../../services/test.utils";
import { ListProfesional } from "./list";

const reducer = {
    profesional: profesionalReducer,
    review: reviewReducer,
};

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
    review: [],
};

const login = { token: "1", id: "2" };
describe("Given the component ListProfesional", () => {
    beforeEach(() => {
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
                <BrowserRouter>
                    <ListProfesional
                        type={"arquitect"}
                        search={"j"}
                        order={"price+"}
                    />
                </BrowserRouter>,
                { preloadedState, reducer }
            );

            expect(await screen.findByAltText(/jose/i)).toBeInTheDocument();
        });
    });

    describe("When I order all options", () => {
        test("By price-", async () => {
            render(
                <BrowserRouter>
                    <ListProfesional
                        type={"arquitect"}
                        search={"j"}
                        order={"price-"}
                    />
                </BrowserRouter>,
                { preloadedState, reducer }
            );

            expect(await screen.findByAltText(/jose/i)).toBeInTheDocument();
        });
        test("By votes+", async () => {
            render(
                <BrowserRouter>
                    <ListProfesional
                        type={"arquitect"}
                        search={"j"}
                        order={"votes+"}
                    />
                </BrowserRouter>,
                { preloadedState, reducer }
            );

            expect(await screen.findByAltText(/jose/i)).toBeInTheDocument();
        });
        test("By votes-", async () => {
            render(
                <BrowserRouter>
                    <ListProfesional
                        type={"arquitect"}
                        search={"j"}
                        order={"votes-"}
                    />
                </BrowserRouter>,
                { preloadedState, reducer }
            );

            expect(await screen.findByAltText(/jose/i)).toBeInTheDocument();
        });
        test("By rating+", async () => {
            render(
                <BrowserRouter>
                    <ListProfesional
                        type={"arquitect"}
                        search={"j"}
                        order={"rating+"}
                    />
                </BrowserRouter>,
                { preloadedState, reducer }
            );

            expect(await screen.findByAltText(/jose/i)).toBeInTheDocument();
        });
        test("By rating-", async () => {
            render(
                <BrowserRouter>
                    <ListProfesional
                        type={"arquitect"}
                        search={"j"}
                        order={"rating-"}
                    />
                </BrowserRouter>,
                { preloadedState, reducer }
            );

            expect(await screen.findByAltText(/jose/i)).toBeInTheDocument();
        });
        test("By default case", async () => {
            render(
                <BrowserRouter>
                    <ListProfesional
                        type={"arquitect"}
                        search={"j"}
                        order={""}
                    />
                </BrowserRouter>,
                { preloadedState, reducer }
            );

            expect(await screen.findByAltText(/jose/i)).toBeInTheDocument();
        });
    });
});
