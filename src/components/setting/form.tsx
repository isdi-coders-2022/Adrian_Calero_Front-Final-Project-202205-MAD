import { SyntheticEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { iUser } from "../../interfaces/interfaces";
import { iStore } from "../../store/store";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import { HttpUser } from "../../services/http.user";
import * as ac from "../../redux/user-reducer/action.creator";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { LocalStorage } from "../../services/localStorage";

export function FormUpdate() {
    const user = useSelector((state: iStore) => state.user as iUser);
    const api = new HttpUser();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const local = new LocalStorage();

    let initialState: Partial<iUser> = {
        _id: user._id || "",
        avatar: user.avatar || "",
        userName: user.userName || "",
        email: user.email || "",
        favorites: user.favorites,
    };

    useEffect(() => {
        setFormData(initialState);
    }, [user]);

    const [formData, setFormData] = useState(initialState);

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
            (url: string) => (formData.avatar = url)
        );
    }

    function handleSubmit(ev: SyntheticEvent) {
        ev.preventDefault();

        api.updateUser(formData).then((resp) =>
            dispatch(ac.modifyUserAction(resp))
        );

        navigate("/home");
    }

    function handleBack() {
        navigate("/home");
    }

    function handleDelete() {
        api.deleteUser(formData);
        local.removeItem();
        navigate("/home");
    }

    return (
        <>
            <button onClick={handleBack} className="back">
                <ArrowBackIosIcon fontSize="large" />
            </button>
            <form onSubmit={handleSubmit}>
                <label>
                    Change your Avata:
                    <input
                        className="avatar"
                        type="file"
                        name="avatar"
                        onChange={handleUpload}
                    />
                    <AccountCircleIcon
                        sx={{ fontSize: 70, color: "#023E8A" }}
                    />
                </label>
                <label>
                    Change your Username:
                    <input
                        type="text"
                        name="userName"
                        value={formData.userName}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Change your Email:{" "}
                    <input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </label>
                <div className="buttons">
                    <button type="submit">Update</button>
                    <button className="delete" onClick={handleDelete}>
                        Delete
                    </button>
                </div>
            </form>
        </>
    );
}
