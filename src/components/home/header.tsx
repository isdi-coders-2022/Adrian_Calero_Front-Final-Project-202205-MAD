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
import { iStore } from "../../store/store";

export function HeaderHome() {
    const user = useSelector(
        (state: iStore) => state.user as unknown as iLogin
    );
    return (
        <header>
            <div>
                <Typography variant="h3">Your Solution</Typography>
                {user.token && (
                    <>
                        <Typography variant="h4">
                            {" "}
                            Welcome {user.user.userName}
                        </Typography>
                        <Avatar
                            alt={user.user.userName}
                            src={user.user.avatar}
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
