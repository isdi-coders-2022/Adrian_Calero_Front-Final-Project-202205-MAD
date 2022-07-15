export class LocalStorage {
    constructor() {}

    setItem(token: string, id: string) {
        localStorage.setItem("login", JSON.stringify({ token: token, id: id }));
    }

    getItem() {
        const item = JSON.parse(localStorage.getItem("login") as string);
        return item;
    }

    removeItem() {
        localStorage.removeItem("login");
    }
}
