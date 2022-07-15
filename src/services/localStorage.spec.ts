import { LocalStorage } from "./localStorage";

describe("Given the class LocalStorage", () => {
    describe("When i use the method getItem", () => {
        test("Then should be return item", () => {
            global.Storage.prototype.getItem = jest.fn().mockReturnValue("{}");

            const local = new LocalStorage();
            local.getItem();

            expect(localStorage.getItem).toHaveBeenCalled();
        });
    });

    describe("When i use the method setItem", () => {
        test("Then should be return item", () => {
            global.Storage.prototype.setItem = jest.fn();

            const local = new LocalStorage();
            local.setItem("1", "2");

            expect(localStorage.setItem).toHaveBeenCalled();
        });
    });

    describe("When i use the method removeItem", () => {
        test("Then should be return item", () => {
            global.Storage.prototype.removeItem = jest.fn();

            const local = new LocalStorage();
            local.removeItem();

            expect(localStorage.removeItem).toHaveBeenCalled();
        });
    });
});
