import { Review } from "../models/review.model";
import { HttpReview } from "./http.review";

describe("Given the http.review", () => {
    describe("When i use the method getAllInProfesionals", () => {
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
                json: jest.fn().mockResolvedValue([
                    new Review(
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
                        {
                            avatar: "url",
                            userName: "test",
                            email: "test@test.com",
                            passwd: "1234",
                            favorites: [],
                        },
                        "1-01-1111",
                        { img: [], video: [], comment: "test", score: 5 }
                    ),
                ]),
            });

            const result = await new HttpReview().getAllInProfesionals(
                profesional._id
            );

            expect(fetch).toBeCalled();
            expect(result).toHaveLength(1);
        });
    });

    describe("When i use the method addReview", () => {
        test("Then should be render", async () => {
            const review = new Review(
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
                {
                    avatar: "url",
                    userName: "test",
                    email: "test@test.com",
                    passwd: "1234",
                    favorites: [],
                },
                "1-01-1111",
                { img: [], video: [], comment: "test", score: 5 }
            );

            global.fetch = jest.fn().mockResolvedValue({
                json: jest.fn().mockResolvedValue(review),
            });

            const result = await new HttpReview().addReview(review);

            expect(fetch).toBeCalled();
            expect(result.date).toBe("1-01-1111");
        });
    });

    describe("When i use the method updateReview", () => {
        test("Then should be render", async () => {
            const review = new Review(
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
                {
                    avatar: "url",
                    userName: "test",
                    email: "test@test.com",
                    passwd: "1234",
                    favorites: [],
                },
                "1-01-1111",
                { img: [], video: [], comment: "test", score: 5 }
            );

            const modifyReview = { ...review, date: "2-02-2222" };

            global.fetch = jest.fn().mockResolvedValue({
                json: jest.fn().mockResolvedValue(modifyReview),
            });

            const result = await new HttpReview().updateReview(modifyReview);

            expect(fetch).toBeCalled();
            expect(result.date).toBe("2-02-2222");
        });
    });

    describe("When i use the method deleteReview", () => {
        test("Then should be render", async () => {
            const review = new Review(
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
                {
                    avatar: "url",
                    userName: "test",
                    email: "test@test.com",
                    passwd: "1234",
                    favorites: [],
                },
                "1-01-1111",
                { img: [], video: [], comment: "test", score: 5 }
            );

            global.fetch = jest.fn().mockResolvedValue({
                json: jest.fn().mockResolvedValue(202),
            });

            const result = await new HttpReview().deleteReview(review);

            expect(fetch).toBeCalled();
            expect(result).toBe(202);
        });
    });
});
