import { AppBar, Button, Toolbar, Typography } from "@mui/material";

export function Header() {
    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    LB
                </Typography>
                <Button color="inherit" variant="outlined">Login</Button>
            </Toolbar>
        </AppBar>
    )
}