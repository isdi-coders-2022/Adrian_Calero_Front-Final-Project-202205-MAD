import { iUser } from "../interfaces/interfaces";

export class HttpUser {
    url: string;
    constructor() {
        this.url = "http://localhost:3600/user";
    }
    getAllUsers(): Promise<iUser[]> {
        return fetch(this.url).then((resp) => resp.json());
    }

    getUser(user: iUser): Promise<iUser> {
        return fetch(this.url + `/${user._id}`).then((resp) => resp.json());
    }

    registerUser(user: iUser): Promise<iUser> {
        return fetch(this.url + "/register", {
            method: "POST",
            body: JSON.stringify(user),
            headers: { "content-type": "application/json" },
        }).then((resp) => resp.json());
    }

    loginUser(user: iUser): Promise<iUser> {
        return fetch(this.url + "/login", {
            method: "POST",
            body: JSON.stringify(user),
            headers: { "content-type": "application/json" },
        }).then((resp) => resp.json());
    }

    updateUser(user: iUser): Promise<iUser> {
        return fetch(this.url + `/${user._id}`, {
            method: "PATCH",
            body: JSON.stringify(user),
            headers: { "content-type": "application/json" },
        }).then((resp) => resp.json());
    }

    deleteUser(user: iUser): Promise<number> {
        return fetch(this.url + `/${user._id}`, {
            method: "DELETE",
        }).then((resp) => resp.status);
    }
}
