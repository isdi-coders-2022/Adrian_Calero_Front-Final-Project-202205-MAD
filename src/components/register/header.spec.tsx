import { render, screen } from "@testing-library/react";
import { HeaderRegister } from "./header";

describe("Given the component ButtonsLoginOrRegister", () => {
    describe("When the component is rendered", () => {
        test("Then it should be render", () => {
            render(<HeaderRegister />);

            expect(screen.getByText(/fix/i)).toBeInTheDocument();
        });
    });
});
