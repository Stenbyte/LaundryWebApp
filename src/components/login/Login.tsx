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

export function Login({
  data,
}: {
  data: Pick<
    MetaDataType,
    "isLoginOpen" | "setIsLoginOpen" | "setIsSignupOpen"
  >;
}) {
  const { isLoginOpen, setIsLoginOpen, setIsSignupOpen } = data;
  return (
    <Dialog open={isLoginOpen} onClose={() => setIsLoginOpen(false)}>
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <TextField fullWidth label="Email" margin="dense" />
        <TextField fullWidth label="Password" type="password" margin="dense" />
        <Typography variant="body2" sx={{ mt: 2 }}>
          Don't have an account?{" "}
          <Button
            onClick={() => {
              setIsSignupOpen(true);
              setIsLoginOpen(false);
            }}
          >
            Sign up
          </Button>
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setIsLoginOpen(false)} color="secondary">
          Cancel
        </Button>
        <Button color="primary" variant="contained">
          Login
        </Button>
      </DialogActions>
    </Dialog>
  );
}
