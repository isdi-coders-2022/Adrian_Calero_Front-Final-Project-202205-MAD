import { Button, TextField } from "@mui/material";

export function FormLogin (){
    return(
        <form>              
            <TextField className="inputText" label='Username' variant="outlined" required={true} margin="normal" />
            <TextField className="inputText" label='Password' variant="outlined" required={true} type='password' margin="normal" />
            <Button type="submit" variant="contained" >Login</Button>
        </form>
    )
}