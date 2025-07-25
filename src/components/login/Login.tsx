import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Typography,
  DialogActions,
} from "@mui/material";
import { GenericButton } from "../Buttons/GenericButton";
import { useState } from "react";
import { useAuth, useLogin } from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { InferType, object, string } from "yup";
import { useUIContext } from "../../context/UseUIContext";

const LoginSchema = object().shape({
  email: string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email format"
    )
    .required("Email is required"),
  // password: string()
  //   .matches(
  //     /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  //     "Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character"
  //   )
  //   .required("Password is required"),
});

type LoginType = InferType<typeof LoginSchema>;

const defaultLoginValues: LoginType = {
  email: "",
  // password: "",
};

export function Login() {
  const [isLoading, setLoading] = useState(false);

  const login = useLogin();

  useAuth();
  const { dispatch } = useUIContext();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues: {
      // password: "",
      email: "",
    },
  });
  const onSubmit = async (data: LoginType) => {
    setLoading(true);
    try {
      await login.mutateAsync(data);
      toast.success("Ola");
      reset(defaultLoginValues);
    } catch (err) {
      toast.error(`Login failed ${err}`);
    }
    setLoading(false);
  };

  const userId = localStorage.getItem("userId");
  let loggedIn = false;
  if (userId) {
    loggedIn = true;
  }
  return (
    <div>
      <Dialog open={!loggedIn} hideBackdrop={false}>
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
            {/* <Controller
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
            /> */}
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
                onClick={() => {
                  dispatch({ type: "SET_SIGNUP", payload: true });
                }}
              />
            </Typography>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
