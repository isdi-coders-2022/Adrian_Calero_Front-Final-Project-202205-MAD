import LoginIcon from "@mui/icons-material/Login";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link } from "react-router-dom";
import { Divider } from "@mui/material";

export function FooterHome() {
    return (
        <>
            <Divider />
            <nav className="navigation">
                <Link to="/home">
                    <HomeIcon />
                </Link>
                <Link to="/setting">
                    <SettingsIcon />
                </Link>
                <Link to="/registerorlogin">
                    <LoginIcon />
                </Link>
            </nav>
        </>
    );
}
