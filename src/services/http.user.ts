import { iLogin, iUser } from "../interfaces/interfaces";
import { LocalStorage } from "./localStorage";

export class HttpUser {
    url: string;
    local: LocalStorage;
    login: any;
    constructor() {
        this.url = "http://localhost:3600/user";
        this.local = new LocalStorage();
        this.login = this.local.getItem();
    }
    getAllUsers(): Promise<iUser[]> {
        return fetch(this.url).then((resp) => resp.json());
    }

    getUser(id: string): Promise<iUser> {
        return fetch(this.url + `/${id}`).then((resp) => resp.json());
    }

    registerUser(user: iUser): Promise<iUser> {
        return fetch(this.url + "/register", {
            method: "POST",
            body: JSON.stringify(user),
            headers: { "content-type": "application/json" },
        }).then((resp) => resp.json());
    }

    loginUser(user: Partial<iUser>): Promise<iLogin> {
        return fetch(this.url + "/login", {
            method: "POST",
            body: JSON.stringify(user),
            headers: { "content-type": "application/json" },
        }).then((resp) => resp.json());
    }

    updateUser(user: Partial<iUser>): Promise<iUser> {
        return fetch(this.url + `/${user._id}`, {
            method: "PATCH",
            body: JSON.stringify(user),
            headers: {
                Accept: "application/json",
                "content-type": "application/json",
                Authorization: "Bearer " + this.login.token,
            },
        }).then((resp) => resp.json());
    }

    deleteUser(user: Partial<iUser>): Promise<number> {
        return fetch(this.url + `/${user._id}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "content-type": "application/json",
                Authorization: "Bearer " + this.login.token,
            },
        }).then((resp) => resp.status);
    }
}
