import { Search } from "@mui/icons-material";

import {
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Typography,
} from "@mui/material";

export function HeaderHome() {
    return (
        <header>
            <div>
                <Typography variant="h1">Your Solution</Typography>
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
