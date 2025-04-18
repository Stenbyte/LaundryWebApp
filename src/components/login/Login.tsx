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
import { GenericButton } from "../Buttons/GenericButton";
import { useState } from "react";
import { useLogin } from "../../hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { InferType, object, string } from "yup";

const LoginSchema = object().shape({
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

type LoginType = InferType<typeof LoginSchema>;

const defaultLoginValues: LoginType = {
  email: "",
  password: "",
};

export function Login({
  data,
}: {
  data: Pick<MetaDataType, "setIsSignupOpen" | "isLogedIn" | "setIsLogedIn">;
}) {
  const { setIsSignupOpen, isLogedIn } = data;
  const [isLoading, setLoading] = useState(false);

  const { mutate: login, error } = useLogin();

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
  const onSubmit = async (data: LoginType) => {
    setLoading(true);
    try {
      await login(data);
      reset(defaultLoginValues);
    } catch (err) {
      console.log(err);
      if (error) {
        toast(`Login failed: ${error.message}`);
      }
    }
    setLoading(false);
  };

  return (
    <>
      <ToastContainer closeOnClick={true} />
      <Dialog open={!isLogedIn} hideBackdrop={true}>
        <DialogTitle>Login</DialogTitle>
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
            <ToastContainer />
            <Typography variant="body2" sx={{ mt: 2 }}>
              Don't have an account?
              <GenericButton
                children="Sign up"
                onClick={() => {
                  setIsSignupOpen(true);
                }}
              />
            </Typography>
            <DialogActions>
              <Button type="submit" color="primary" variant="contained">
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
