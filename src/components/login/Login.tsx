import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Typography,
  DialogActions,
} from "@mui/material";
import { GenericButton } from "../Buttons/GenericButton";
import { useCallback, useState } from "react";
import { useLogin } from "../../hooks/auhtHooks";
import { toast } from "react-toastify";
import {
  Control,
  Controller,
  FieldErrors,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { useUIContext } from "../../context/UseUIContext";
import { LoginType } from "../../constants";
import { SignUpDialog } from "./SignUp";
import { ReleaseNotesDialog } from "../releaseNotes/ReleaseNotesDialog";

export const LoginSchema = object().shape({
  email: string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email format"
    )
    .required("Email is required"),
  password: string()
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .required("Password is required"),
});

const defaultLoginValues: LoginType = {
  email: "",
  password: "",
};

export function Login() {
  const [isLoading, setLoading] = useState(false);

  const login = useLogin();

  const { dispatch, isSignUpOpen } = useUIContext();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues: {
      password: "",
      email: "",
    },
  });
  const onSubmit = useCallback(
    async (data: LoginType) => {
      setLoading(true);
      try {
        await login.mutateAsync(data);
        toast.success("Ola");
        reset(defaultLoginValues);
      } catch (err) {
        toast.error(`Login failed ${err}`);
      }
      setLoading(false);
    },
    [login, reset]
  );

  const openSignUp = useCallback(() => {
    dispatch({ type: "SET_SIGNUP", payload: true });
  }, [dispatch]);

  return (
    <div>
      {!isSignUpOpen && (
        <>
          <LoginDialog
            control={control}
            errors={errors}
            isLoading={isLoading}
            openSignUp={openSignUp}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
          />
          <ReleaseNotesDialog />
        </>
      )}
      {isSignUpOpen && <SignUpDialog />}
    </div>
  );
}

function LoginDialog({
  control,
  errors,
  isLoading,
  openSignUp,
  handleSubmit,
  onSubmit,
}: {
  control: Control<
    {
      password: string;
      email: string;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any
  >;
  errors: FieldErrors<{
    password: string;
    email: string;
  }>;
  isLoading: boolean;
  openSignUp: () => void;
  handleSubmit: (
    onValid: SubmitHandler<{
      password: string;
      email: string;
    }>,
    onInvalid?:
      | SubmitErrorHandler<{
          password: string;
          email: string;
        }>
      | undefined
  ) => (e?: React.BaseSyntheticEvent) => Promise<void>;
  onSubmit: (data: LoginType) => Promise<void>;
}) {
  return (
    <Dialog
      open={true}
      hideBackdrop={false}
      style={{
        backgroundColor: "#5E506F",
        borderRadius: "5px",
        width: "30vw",
        height: "51vh",
        margin: "auto",
      }}
    >
      <DialogTitle data-testid="login-title">Login</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  fullWidth
                  data-testid="email"
                  label="Email"
                  margin="dense"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              );
            }}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Password"
                type="password"
                margin="dense"
              />
            )}
          />
          <DialogActions>
            <GenericButton
              className="loginBtn"
              testid="login-btn"
              children={isLoading ? "Logging in..." : "Login"}
              type="submit"
            />
          </DialogActions>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Don't have an account ?
            <GenericButton
              children="Sign up"
              testid="signup-btn"
              className="signUpBtn"
              onClick={openSignUp}
            />
          </Typography>
        </form>
      </DialogContent>
    </Dialog>
  );
};
