import { BrowserRouter } from "react-router-dom";
import { iProfesional } from "../../interfaces/interfaces";
import { listReducer } from "../../redux/list-reducer/action.reducer";
import { profesionalReducer } from "../../redux/profesional-reducer/action.reducer";
import { reviewReducer } from "../../redux/review-reducer/action.reducer";
import { fireEvent, render, screen } from "../../services/test.utils";
import { SearchAndFilter } from "./search&filter";

const reducer = {
    profesional: profesionalReducer,
    review: reviewReducer,
    list: listReducer,
};
const mockProfesional: iProfesional = {
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
    list: [{ accum: 3, total: 2, prof: mockProfesional }],
};
describe("Given the component SearchAndFilter", () => {
    beforeEach(() => {
        Promise.all = jest.fn().mockResolvedValue([
            {
                accum: 1,
                total: 1,
                prof: mockProfesional,
            },
            {
                accum: 1,
                total: 1,
                prof: {
                    ...mockProfesional,
                    name: "antonio",
                },
            },
        ]);
    });
    describe("When I render the component", () => {
        test("Then it should be rendered", () => {
            render(
                <BrowserRouter>
                    <SearchAndFilter />
                </BrowserRouter>,
                { preloadedState, reducer }
            );

            expect(screen.getByRole("textbox")).toBeInTheDocument();
        });
    });

    describe("When I search something", () => {
        test("Then it should be changed", () => {
            render(
                <BrowserRouter>
                    <SearchAndFilter />
                </BrowserRouter>,
                { preloadedState, reducer }
            );

            const input = screen.getByTestId("search");

            fireEvent.change(input, { target: { value: "test" } });

            expect(input).toHaveValue("test");
        });
    });

    describe("When I select other value", () => {
        test("Then it should be changed", () => {
            render(
                <BrowserRouter>
                    <SearchAndFilter />
                </BrowserRouter>,
                { preloadedState, reducer }
            );

            const input = screen.getByTestId("profesion");

            fireEvent.change(input, { target: { value: "plumber" } });

            expect(input).toHaveValue("plumber");
        });
    });

    describe("When I select other value for order", () => {
        test("Then it should be changed", () => {
            render(
                <BrowserRouter>
                    <SearchAndFilter />
                </BrowserRouter>,
                { preloadedState, reducer }
            );

            const input = screen.getByTestId("order");

            fireEvent.change(input, { target: { value: "price+" } });

            expect(input).toHaveValue("price+");
        });
    });
});
