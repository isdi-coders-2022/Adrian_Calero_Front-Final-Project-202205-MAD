import { User } from "../models/user.model";
import { HttpUser } from "./http.user";
import { LocalStorage } from "./localStorage";

describe("Given the http.user", () => {
    describe("When i use the method getAllUsers", () => {
        test("Then should be render", async () => {
            global.fetch = jest.fn().mockResolvedValue({
                json: jest
                    .fn()
                    .mockResolvedValue([
                        new User("url", "test", "test@test.com", "1234", []),
                        new User("url", "test2", "test2@test.com", "1234", []),
                    ]),
            });
            const result = await new HttpUser().getAllUsers();

            expect(fetch).toBeCalled();
            expect(result).toHaveLength(2);
        });
    });

    describe("When i use the method getUser", () => {
        test("Then should be render", async () => {
            const user = new User("url", "test", "test@test.com", "1234", []);
            global.fetch = jest.fn().mockResolvedValue({
                json: jest.fn().mockResolvedValue(user),
            });
            const result = await new HttpUser().getUser("1");

            expect(fetch).toBeCalled();
            expect(result.userName).toBe("test");
        });
    });

    describe("When i use the method registerUser", () => {
        test("Then should be render", async () => {
            const user = new User("url", "test", "test@test.com", "1234", []);
            global.fetch = jest.fn().mockResolvedValue({
                json: jest.fn().mockResolvedValue(user),
            });
            const result = await new HttpUser().registerUser(user);

            expect(fetch).toBeCalled();
            expect(result.userName).toBe("test");
        });
    });

    describe("When i use the method loginUser", () => {
        test("Then should be render", async () => {
            const user = { userName: "test", passwd: "1234" };
            global.fetch = jest.fn().mockResolvedValue({
                json: jest.fn().mockResolvedValue({
                    token: "",
                    user: { userName: "test" },
                }),
            });
            const result = await new HttpUser().loginUser(user);

            expect(fetch).toBeCalled();
            expect(result.user.userName).toBe("test");
        });
    });

    describe("When i use the method updateUser", () => {
        test("Then should be render", async () => {
            LocalStorage.prototype.getItem = jest
                .fn()
                .mockResolvedValue({ token: "1", id: "2" });
            const user = new User("url", "test", "test@test.com", "1234", []);
            const modifyUser = { ...user, userName: "pepe" };
            global.fetch = jest.fn().mockResolvedValue({
                json: jest.fn().mockResolvedValue(modifyUser),
            });
            const result = await new HttpUser().updateUser(modifyUser);

            expect(fetch).toBeCalled();
            expect(result.userName).toBe("pepe");
        });
    });

    describe("When i use the method deleteUser", () => {
        test("Then should be render", async () => {
            LocalStorage.prototype.getItem = jest
                .fn()
                .mockResolvedValue({ token: "1", id: "2" });
            const user = new User("url", "test", "test@test.com", "1234", []);

            global.fetch = jest.fn().mockResolvedValue({
                json: jest.fn().mockResolvedValue(user),
            });
            const result = await new HttpUser().deleteUser(user);

            expect(fetch).toBeCalled();
            expect(result).toBe(undefined);
        });
    });
});
