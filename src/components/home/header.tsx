import { useSelector } from "react-redux";
import { iLogin } from "../../interfaces/interfaces";
import { LocalStorage } from "../../services/localStorage";
import { iStore } from "../../store/store";

export function HeaderHome() {
    const user = useSelector(
        (state: iStore) => state.user as unknown as iLogin
    );
    const userLocalStoage = new LocalStorage(user);
    const logged = userLocalStoage.getItem();
    const initialLetter = (logged.user.userName[0] as string).toUpperCase();
    return (
        <header>
            <h1>Your Solution</h1>
            {(user.token || logged) && (
                <div className="welcome">
                    {!logged.user.avatar ? (
                        <div>{initialLetter}</div>
                    ) : (
                        <img
                            alt={logged.user.userName}
                            src={logged.user.avatar}
                        />
                    )}
                    <h4>Welcome {logged.user.userName}</h4>
                </div>
            )}
        </header>
    );
}
