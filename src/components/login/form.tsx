import { Button, TextField } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { HttpUser } from "../../services/http.user";
import * as ac from "../../redux/user-reducer/action.creator";
import { iLogin } from "../../interfaces/interfaces";
import { useNavigate } from "react-router-dom";
import { LocalStorage } from "../../services/localStorage";
import Swal from "sweetalert2";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

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
    function handleBack() {
        navigate(`/registerorlogin`);
    }

    function handleSubmit(ev: SyntheticEvent) {
        ev.preventDefault();

        const userLogin = {
            userName: formData.userName,
            passwd: formData.passwd,
        };

        api.loginUser(userLogin).then((resp) => {
            if (resp.token) {
                dispatch(ac.loginUserAction(resp as unknown as iLogin));

                const storage = new LocalStorage();
                storage.removeItem();
                storage.setItem(resp.token, resp.user._id as string);
                navigate("/home");
            } else {
                Swal.fire({
                    title: "Error!",
                    text: "Invalid Username or Password",
                    icon: "error",
                    confirmButtonText: "Cool",
                });
            }
        });
    }

    return (
        <div>
            <button onClick={handleBack} className="back">
                <ArrowBackIosIcon fontSize="large" />
            </button>
            <form onSubmit={handleSubmit} className="login">
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
