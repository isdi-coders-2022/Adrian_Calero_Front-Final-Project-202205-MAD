import { Button, TextField } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { HttpUser } from "../../services/http.user";
import * as ac from "../../redux/user-reducer/action.creator";
import { iLogin } from "../../interfaces/interfaces";
import { useNavigate } from "react-router-dom";
import { LocalStorage } from "../../services/localStorage";

export function FormLogin() {
    let navigate = useNavigate();
    const api = new HttpUser();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        userName: "",
        passwd: "",
    });

    function handleChange(ev: SyntheticEvent) {
        const element = ev.target as HTMLFormElement;
        setFormData({ ...formData, [element.name]: element.value });
    }

    function handleSubmit(ev: SyntheticEvent) {
        ev.preventDefault();
        try {
            const userLogin = {
                userName: formData.userName,
                passwd: formData.passwd,
            };

            api.loginUser(userLogin).then((resp) => {
                dispatch(ac.loginUserAction(resp as unknown as iLogin));
                const storage = new LocalStorage(resp as unknown as iLogin);
                storage.setItem();
            });

            navigate("/home");
        } catch (error) {}
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <TextField
                    className="inputText"
                    label="Username"
                    name="userName"
                    variant="outlined"
                    required={true}
                    margin="normal"
                    onChange={handleChange}
                />
                <TextField
                    className="inputText"
                    label="Password"
                    name="passwd"
                    variant="outlined"
                    required={true}
                    type="password"
                    margin="normal"
                    onChange={handleChange}
                />
                <Button type="submit" variant="contained">
                    Login
                </Button>
            </form>
        </div>
    );
}
