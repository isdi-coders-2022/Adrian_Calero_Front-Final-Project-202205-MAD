import {
    Button,
    IconButton,
    styled,
    TextField,
    Typography,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { SyntheticEvent, useState } from "react";
import { User } from "../../models/user.model";
import { HttpUser } from "../../services/http.user";
import { useDispatch } from "react-redux";
import * as ac from "../../redux/user-reducer/action.creator";
import { useNavigate } from "react-router-dom";

const Input = styled("input")({
    display: "none",
});

export function Form() {
    const api = new HttpUser();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        avatar: "",
        userName: "",
        email: "",
        passwd: "",
    });

    function handleChange(ev: SyntheticEvent) {
        const element = ev.target as HTMLFormElement;
        setFormData({ ...formData, [element.name]: element.value });
    }

    function handleSubmit(ev: SyntheticEvent) {
        ev.preventDefault();
        try {
            const newUser: User = {
                ...new User(
                    formData.avatar,
                    formData.userName,
                    formData.email,
                    formData.passwd,
                    []
                ),
            };

            api.registerUser(newUser).then((resp) => console.log(resp));

            setFormData({ avatar: "", userName: "", email: "", passwd: "" });

            navigate("/login");
        } catch (error) {}
    }

    return (
        <form onSubmit={handleSubmit}>
            <Typography variant="subtitle1">Add avatar file:</Typography>
            <label htmlFor="icon-button-file">
                <Input
                    id="icon-button-file"
                    type="file"
                    name="avatar"
                    onChange={handleChange}
                />
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
                onChange={handleChange}
            />
            <TextField
                className="inputText"
                label="Email"
                variant="outlined"
                name="email"
                required={true}
                margin="normal"
                onChange={handleChange}
            />
            <TextField
                className="inputText"
                label="Password"
                variant="outlined"
                name="passwd"
                required={true}
                type="password"
                margin="normal"
                onChange={handleChange}
            />
            <Button type="submit" variant="contained">
                Register
            </Button>
        </form>
    );
}
