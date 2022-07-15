import { useSelector } from "react-redux";
import { iStore } from "../../store/store";

export function HeaderHome() {
    const user = useSelector((state: iStore) => state.user);

    return (
        <header>
            <h1>Your Solution</h1>
            {user && (
                <div className="welcome">
                    {!user.avatar ? (
                        <div>{user.userName?.[0].toUpperCase()}</div>
                    ) : (
                        <img alt={user.userName} src={user.avatar} />
                    )}
                    <h4>Welcome {user.userName}</h4>
                </div>
            )}
        </header>
    );
}
