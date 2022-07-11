import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";

export function FooterHome() {
    return (
        <Paper
            sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
            elevation={3}
        >
            <BottomNavigation showLabels>
                <BottomNavigationAction
                    label="Home"
                    href="/home"
                    icon={<HomeIcon />}
                />
                <BottomNavigationAction
                    label="Settings"
                    icon={<SettingsIcon />}
                />
                <BottomNavigationAction
                    label="Register/Login"
                    href="/registerorlogin"
                    icon={<LoginIcon />}
                />
            </BottomNavigation>
        </Paper>
    );
}
