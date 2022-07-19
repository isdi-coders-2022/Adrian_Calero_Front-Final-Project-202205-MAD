import LoginIcon from "@mui/icons-material/Login";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link } from "react-router-dom";
import { LocalStorage } from "../../services/localStorage";
import LogoutIcon from "@mui/icons-material/Logout";

export function FooterHome() {
    const local = new LocalStorage();
    const login = local.getItem();

    function handleLogout() {
        local.removeItem();
    }

    return (
        <>
            <nav className="navigation">
                <Link to="/home">
                    <HomeIcon style={{ color: "aliceblue" }} />
                </Link>
                <Link to={login ? "/setting" : "/home"}>
                    <SettingsIcon style={{ color: "aliceblue" }} />
                </Link>
                {login ? (
                    <Link
                        to="/registerorlogin"
                        role="button"
                        onClick={handleLogout}
                    >
                        <LogoutIcon style={{ color: "aliceblue" }} />
                    </Link>
                ) : (
                    <Link to="/registerorlogin">
                        <LoginIcon style={{ color: "aliceblue" }} />
                    </Link>
                )}
            </nav>
        </>
    );
}
