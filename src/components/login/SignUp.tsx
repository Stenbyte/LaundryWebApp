import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import { MetaDataType } from "../header/Header";

export function SignUp({
  data,
}: {
  data: Pick<MetaDataType, "isSignupOpen" | "setIsSignupOpen">;
}) {
  const { setIsSignupOpen, isSignupOpen } = data;
  return (
    <Dialog
      open={isSignupOpen}
      onClose={() => setIsSignupOpen(false)}
      hideBackdrop={true}
    >
      <DialogTitle>Sign Up</DialogTitle>
      <DialogContent>
        <TextField fullWidth label="Email" margin="dense" />
        <TextField fullWidth label="Password" type="password" margin="dense" />
        <TextField fullWidth label="Phone" margin="dense" />
        <TextField fullWidth label="Street Address" margin="dense" />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setIsSignupOpen(false)} color="secondary">
          Cancel
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            setIsSignupOpen(false);
          }}
        >
          Sign Up
        </Button>
      </DialogActions>
    </Dialog>
  );
}
