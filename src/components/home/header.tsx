import { useEffect } from "react";
import { useSelector } from "react-redux";
import { HttpUser } from "../../services/http.user";
import { LocalStorage } from "../../services/localStorage";
import { iStore } from "../../store/store";

export function HeaderHome() {
    const user = useSelector((state: iStore) => state.user);
    const local = new LocalStorage().getItem();
    const api = new HttpUser();

    useEffect(() => {
        if (local) {
            api.getUser(local.id);
        }
    }, [user, api, local]);

    return (
        <header className={!local ? "title-center" : "div"}>
            <div className="title">
                <h1>Your</h1>
                <h1> Solution</h1>
            </div>

            {local ? (
                <div className="welcome">
                    {!user.avatar ? (
                        <div>{user.userName?.[0].toUpperCase()}</div>
                    ) : (
                        <img alt={user.userName} src={user.avatar} />
                    )}
                    <h4>{user.userName}</h4>
                </div>
            ) : (
                <></>
            )}
        </header>
    );
}
