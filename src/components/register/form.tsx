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
import { useNavigate } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import Swal from "sweetalert2";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

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

    function handleBack() {
        navigate(`/registerorlogin`);
    }

    function handleChange(ev: SyntheticEvent) {
        const element = ev.target as HTMLFormElement;
        setFormData({ ...formData, [element.name]: element.value });
    }

    async function handleUpload(ev: SyntheticEvent) {
        const element = ev.target as HTMLInputElement;
        const file = (element.files as FileList)[0];
        const avatarRef = ref(storage, `/files/${file.name}`);
        await uploadBytes(
            avatarRef,
            file as unknown as Blob | Uint8Array | ArrayBuffer
        );
        await getDownloadURL(ref(storage, `/files/${file.name}`)).then(
            (url) => (formData.avatar = url)
        );
    }

    function handleSubmit(ev: SyntheticEvent) {
        ev.preventDefault();

        const newUser: User = {
            ...new User(
                formData.avatar,
                formData.userName,
                formData.email,
                formData.passwd,
                []
            ),
        };

        api.registerUser(newUser).then((resp) =>
            resp
                ? Swal.fire({
                      title: "User created correctly",
                      text: "Loged for continue",
                      icon: "success",
                      confirmButtonText: "Next",
                  })
                : Swal.fire({
                      title: "Error!",
                      text: "Invalid params",
                      icon: "error",
                      confirmButtonText: "Try again",
                  })
        );

        setFormData({ avatar: "", userName: "", email: "", passwd: "" });

        navigate("/login");
    }

    return (
        <>
            <button
                onClick={handleBack}
                className="back"
                data-testid="back-register"
            >
                <ArrowBackIosIcon fontSize="large" />
            </button>
            <form onSubmit={handleSubmit} className="register">
                <Typography variant="subtitle1">Add avatar file:</Typography>
                <label htmlFor="icon-button-file">
                    <Input
                        data-testid="fileupload"
                        id="icon-button-file"
                        type="file"
                        name="avatar"
                        onChange={handleUpload}
                    />
                    <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                    >
                        <AccountCircleIcon sx={{ fontSize: 70 }} />
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
        </>
    );
}
