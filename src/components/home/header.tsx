import { useSelector } from "react-redux";
import { LocalStorage } from "../../services/localStorage";
import { iStore } from "../../store/store";

export function HeaderHome() {
    const user = useSelector((state: iStore) => state.user);
    const local = new LocalStorage().getItem();

    return (
        <header>
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
