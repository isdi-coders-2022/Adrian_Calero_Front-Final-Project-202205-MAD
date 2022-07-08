import { HttpProfesional } from "./http.profesional";

describe("Given the http.user", () => {
    describe("When i use the method getAllUsers", () => {
        test("Then should be render", async () => {
            global.fetch = jest.fn().mockResolvedValue({
                json: jest.fn().mockResolvedValue([
                    {
                        _id: "1",
                        avatar: "url",
                        name: "test",
                        profesion: "tester",
                        info: {
                            description: "test",
                            price: 1,
                            img: "url",
                            video: "url",
                        },
                    },
                ]),
            });
            const result = await new HttpProfesional().getAllProfesional();

            expect(fetch).toBeCalled();
            expect(result).toHaveLength(1);
        });
    });

    describe("When i use the method getUser", () => {
        test("Then should be render", async () => {
            const profesional = {
                _id: "1",
                avatar: "url",
                name: "test",
                profesion: "tester",
                info: {
                    description: "test",
                    price: 1,
                    img: "url",
                    video: "url",
                },
            };
            global.fetch = jest.fn().mockResolvedValue({
                json: jest.fn().mockResolvedValue(profesional),
            });
            const result = await new HttpProfesional().getProfesional(
                profesional
            );

            expect(fetch).toBeCalled();
            expect(result.name).toBe("test");
        });
    });
});
