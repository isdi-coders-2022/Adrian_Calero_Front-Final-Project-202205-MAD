import {
    Button,
    IconButton,
    styled,
    TextField,
    Typography,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Input = styled("input")({
    display: "none",
});

export function Form() {
    return (
        <form>
            <Typography variant="subtitle1">Add avatar file:</Typography>
            <label htmlFor="icon-button-file">
                <Input id="icon-button-file" type="file" />
                <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                >
                    <AccountCircleIcon sx={{ fontSize: 50 }} />
                </IconButton>
            </label>
            <TextField
                className="inputText"
                label="Username"
                variant="outlined"
                name="userName"
                required={true}
                margin="normal"
            />
            <TextField
                className="inputText"
                label="Email"
                variant="outlined"
                name="email"
                required={true}
                margin="normal"
            />
            <TextField
                className="inputText"
                label="Password"
                variant="outlined"
                name="passwd"
                required={true}
                type="password"
                margin="normal"
            />
            <Button type="submit" variant="contained">
                Register
            </Button>
        </form>
    );
}
