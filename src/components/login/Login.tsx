import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Typography,
  Button,
  DialogActions,
} from "@mui/material";
import { MetaDataType } from "../header/Header";
import { GenericButton } from "../buttons/GenericButton";

export function Login({
  data,
}: {
  data: Pick<MetaDataType, "setIsSignupOpen" | "isLogedIn" | "setIsLogedIn">;
}) {
  const { setIsSignupOpen, isLogedIn, setIsLogedIn } = data;
  return (
    <Dialog open={!isLogedIn} hideBackdrop={true}>
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <TextField fullWidth label="Email" margin="dense" />
        <TextField fullWidth label="Password" type="password" margin="dense" />
        <Typography variant="body2" sx={{ mt: 2 }}>
          Don't have an account?
          <GenericButton
            children="Sign up"
            onClick={() => {
              setIsSignupOpen(true);
            }}
          />
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            setIsLogedIn(true);
          }}
        >
          Login
        </Button>
      </DialogActions>
    </Dialog>
  );
}
