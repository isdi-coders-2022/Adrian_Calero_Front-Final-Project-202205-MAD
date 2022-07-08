import { iProfesional } from "../interfaces/interfaces";

export class HttpProfesional {
    url: string;
    constructor() {
        this.url = "http://localhost:3600/profesional";
    }

    getAllProfesional(): Promise<iProfesional[]> {
        return fetch(this.url).then((resp) => resp.json());
    }

    getProfesional(profesional: iProfesional): Promise<iProfesional> {
        return fetch(this.url + `/${profesional._id}`).then((resp) =>
            resp.json()
        );
    }
}
