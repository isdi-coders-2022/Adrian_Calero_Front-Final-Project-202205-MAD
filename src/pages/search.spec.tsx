import { BrowserRouter } from "react-router-dom";
import { listReducer } from "../redux/list-reducer/action.reducer";
import { profesionalReducer } from "../redux/profesional-reducer/action.reducer";
import { reviewReducer } from "../redux/review-reducer/action.reducer";
import { userReducer } from "../redux/user-reducer/action.reducer";
import { LocalStorage } from "../services/localStorage";
import { render, screen } from "../services/test.utils";
import Search from "./search";

jest.mock("../services/localStorage");

const reducer = {
    profesional: profesionalReducer,
    user: userReducer,
    review: reviewReducer,
    list: listReducer,
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

const mockReview = {
    _id: "62c41bec8bfe11181f9ebf54",
    worker: "62c41172eb20556e8d48e754",
    client: "62c40a97add2c6f044fc6874",
    reviews: {
        comment: "Guapo",
        score: 5,
    },
};

const preloadedState = {
    profesional: [mockProfesional],
    user: {
        _id: "1",
        avatar: "url",
        userName: "test",
        email: "test@test.com",
        favorites: [],
    },
    review: [mockReview],
    list: [{ accum: 3, total: 2, prof: mockProfesional }],
};
const login = { token: "1", id: "62c40a97add2c6f044fc6874" };

describe("Given the page search", () => {
    beforeEach(() => {
        LocalStorage.prototype.getItem = jest.fn().mockResolvedValue(login);
    });
    describe("When i render the page", () => {
        test("Then it shoul be rendered", () => {
            render(
                <BrowserRouter>
                    <Search />
                </BrowserRouter>,
                { preloadedState, reducer }
            );

            expect(screen.getAllByRole("textbox")).toHaveLength(1);
        });
    });
});
