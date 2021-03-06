import { iProfesional, iReview, iUser } from "../interfaces/interfaces";

export class Review implements iReview {
    constructor(
        public worker: Partial<iProfesional>,
        public client: Partial<iUser>,
        public date: string,
        public reviews: {
            img: Array<string>;
            video: Array<string>;
            comment: string;
            score: number;
        }
    ) {}
}
