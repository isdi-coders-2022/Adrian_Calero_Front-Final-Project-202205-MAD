import { Search } from "@mui/icons-material";

import {
    Avatar,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { iLogin } from "../../interfaces/interfaces";
import { LocalStorage } from "../../services/localStorage";
import { iStore } from "../../store/store";

export function HeaderHome() {
    const user = useSelector(
        (state: iStore) => state.user as unknown as iLogin
    );
    const login = new LocalStorage(user);
    const logged = login.getItem();
    return (
        <header>
            <div>
                <Typography variant="h3">Your Solution</Typography>
                {(user.token || logged) && (
                    <>
                        <Typography variant="h4">
                            {" "}
                            Welcome {logged.user.userName}
                        </Typography>
                        <Avatar
                            alt={logged.user.userName}
                            src={logged.user.avatar}
                            sx={{ width: 120, height: 120 }}
                        />
                    </>
                )}
                <InputLabel>Search</InputLabel>
                <OutlinedInput
                    startAdornment={
                        <InputAdornment position="end">
                            <Search />
                        </InputAdornment>
                    }
                />
            </div>
        </header>
    );
}
