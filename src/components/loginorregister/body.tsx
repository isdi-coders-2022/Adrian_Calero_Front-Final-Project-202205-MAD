import { Button, Typography } from "@mui/material";

export function ButtonsLoginOrRegister() {
    return (
        <>
            <div className="buttons-container">
                <Button variant="contained" href="/login">
                    Login
                </Button>
                <Typography variant="h6">or</Typography>
                <Button variant="contained" href="/register">
                    Register
                </Button>
            </div>
        </>
    );
}
