import { iLogin } from "../interfaces/interfaces";

export class LocalStorage {
    constructor() {}

    setItem(login: iLogin) {
        localStorage.setItem("login", JSON.stringify(login));
    }

    getItem() {
        const item = JSON.parse(localStorage.getItem("login") as string);
        return item;
    }

    removeItem() {
        localStorage.removeItem("login");
    }
}
