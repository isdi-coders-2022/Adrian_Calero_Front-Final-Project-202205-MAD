import { iReview } from "../interfaces/interfaces";
import { LocalStorage } from "./localStorage";

export class HttpReview {
    url: string;
    local: LocalStorage;
    login: any;
    constructor() {
        this.url = "http://localhost:3600/review";
        this.local = new LocalStorage();
        this.login = this.local.getItem();
    }

    getAllInProfesionals(id: string): Promise<iReview[]> {
        return fetch(this.url + `/${id}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + this.login.token,
            },
        }).then((resp) => resp.json());
    }

    addReview(review: iReview): Promise<iReview> {
        return fetch(this.url, {
            method: "POST",
            body: JSON.stringify(review),
            headers: { "Content-type": "application/json" },
        }).then((resp) => resp.json());
    }

    updateReview(review: iReview): Promise<iReview> {
        return fetch(this.url + `/${review._id}`, {
            method: "PATCH",
            body: JSON.stringify(review),
            headers: { "Content-type": "application/json" },
        }).then((resp) => resp.json());
    }

    deleteReview(review: iReview): Promise<number> {
        return fetch(this.url + `/${review._id}`, { method: "DELETE" }).then(
            (resp) => resp.json()
        );
    }
}
