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
    const userLocalStoage = new LocalStorage(user);
    const logged = userLocalStoage.getItem();
    const initialLetter = (logged.user.userName[0] as string).toUpperCase();
    return (
        <header>
            <div>
                <Typography variant="h3">Your Solution</Typography>
                {(user.token || logged) && (
                    <div className="welcome">
                        {!logged.user.avatar ? (
                            <Avatar
                                alt={logged.user.userName}
                                sx={{
                                    width: 90,
                                    height: 90,
                                    bgcolor: "#4FB3AA",
                                }}
                            >
                                {initialLetter}
                            </Avatar>
                        ) : (
                            <Avatar
                                alt={logged.user.userName}
                                src={logged.user.avatar}
                                sx={{ width: 90, height: 90 }}
                            />
                        )}
                        <Typography variant="h4">
                            Welcome {logged.user.userName}
                        </Typography>
                    </div>
                )}
                {/* <OutlinedInput
                    startAdornment={
                        <InputAdornment position="end">
                            <Search />
                        </InputAdornment>
                    }
                /> */}
            </div>
        </header>
    );
}
