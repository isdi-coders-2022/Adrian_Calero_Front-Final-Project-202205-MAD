import { fireEvent, render, screen } from "../../services/test.utils";
import { SearchAndFilter } from "./search&filter";

describe("Given the component SearchAndFilter", () => {
    describe("When I render the component", () => {
        test("Then it should be rendered", () => {
            render(<SearchAndFilter />);

            expect(screen.getByRole("textbox")).toBeInTheDocument();
        });
    });

    describe("When I search something", () => {
        test("Then it should be changed", () => {
            render(<SearchAndFilter />);

            const input = screen.getByTestId("search");

            fireEvent.change(input, { target: { value: "test" } });

            expect(input).toHaveValue("test");
        });
    });

    describe("When I select other value", () => {
        test("Then it should be changed", () => {
            render(<SearchAndFilter />);

            const input = screen.getByTestId("profesion");

            fireEvent.change(input, { target: { value: "pompler" } });

            expect(input).toHaveValue("pompler");
        });
    });
});
