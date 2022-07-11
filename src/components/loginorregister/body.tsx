import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export function ButtonsLoginOrRegister() {
    return (
        <>
            <div className="buttons-container">
                <Link to="/login">
                    <Button variant="contained">Login</Button>
                </Link>
                <Typography variant="h6">or</Typography>
                <Link to="/register">
                    <Button variant="contained">Register</Button>
                </Link>
            </div>
        </>
    );
}
