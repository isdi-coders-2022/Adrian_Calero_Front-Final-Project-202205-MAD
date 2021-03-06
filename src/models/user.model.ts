import { iProfesional, iUser } from "../interfaces/interfaces";

export class User implements iUser {
    constructor(
        public avatar: string,
        public userName: string,
        public email: string,
        public passwd: string,
        public favorites: Array<iProfesional>
    ) {}
}
