import { iProfesional } from "../../interfaces/interfaces";
import { profesionalReducer } from "../../redux/profesional-reducer/action.reducer";
import { reviewReducer } from "../../redux/review-reducer/action.reducer";
import { fireEvent, render, screen } from "../../services/test.utils";
import { SearchAndFilter } from "./search&filter";

const reducer = {
    profesional: profesionalReducer,
    review: reviewReducer,
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

const preloadedState = { profesional: [mockProfesional], review: [] };
describe("Given the component SearchAndFilter", () => {
    describe("When I render the component", () => {
        test("Then it should be rendered", () => {
            render(<SearchAndFilter />, { preloadedState, reducer });

            expect(screen.getByRole("textbox")).toBeInTheDocument();
        });
    });

    describe("When I search something", () => {
        test("Then it should be changed", () => {
            render(<SearchAndFilter />, { preloadedState, reducer });

            const input = screen.getByTestId("search");

            fireEvent.change(input, { target: { value: "test" } });

            expect(input).toHaveValue("test");
        });
    });

    describe("When I select other value", () => {
        test("Then it should be changed", () => {
            render(<SearchAndFilter />, { preloadedState, reducer });

            const input = screen.getByTestId("profesion");

            fireEvent.change(input, { target: { value: "pompler" } });

            expect(input).toHaveValue("pompler");
        });
    });

    describe("When I select other value for order", () => {
        test("Then it should be changed", () => {
            render(<SearchAndFilter />, { preloadedState, reducer });

            const input = screen.getByTestId("order");

            fireEvent.change(input, { target: { value: "price+" } });

            expect(input).toHaveValue("price+");
        });
    });
});
