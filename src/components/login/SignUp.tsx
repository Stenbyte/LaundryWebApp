import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, InferType } from "yup";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

interface SignUpProps {
  data: {
    isSignupOpen: boolean;
    setIsSignupOpen: (open: boolean) => void;
  };
}

const SubmitSchema = object().shape({
  email: string()
    .email("Invalid email")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email format"
    )
    .required("Email is required"),
  password: string()
    // .matches(
    //   /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    //   "Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character"
    // )
    .required("Password is required"),
  phone: string()
    .matches(/^\d{8,15}$/, "Invalid phone number")
    .required("Phone is required"),
  streetAdress: string()
    .min(5, "Address must be at least 5 characters")
    .required("Street Adress is required"),
});

export function SignUp({ data }: SignUpProps) {
  const { isSignupOpen, setIsSignupOpen } = data;
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SubmitSchema),
  });

  const mutation = useMutation({
    mutationFn: async (formData: SignUpType) => {
      setIsLoading(true);
      return axios.post("http://localhost:5063/api/signup", formData);
    },
    onSuccess: () => {
      alert("Sign-up successful!");
      setIsSignupOpen(false);
      setIsLoading(false);
    },
    onError: (error) => {
      alert("Sign-up failed. Please try again.");
      setIsLoading(false);
      console.error(error);
    },
  });

  type SignUpType = InferType<typeof SubmitSchema>;

  const onSubmit = (data: SignUpType) => {
    mutation.mutate(data);
  };

  return (
    <Dialog open={isSignupOpen} onClose={() => setIsSignupOpen(false)}>
      <DialogTitle>Sign Up</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                fullWidth
                margin="dense"
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Password"
                type="password"
                fullWidth
                margin="dense"
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            )}
          />
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Phone"
                fullWidth
                margin="dense"
                error={!!errors.phone}
                helperText={errors.phone?.message}
              />
            )}
          />
          <Controller
            name="streetAdress"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Street Adress"
                fullWidth
                margin="dense"
                error={!!errors.streetAdress}
                helperText={errors.streetAdress?.message}
              />
            )}
          />
          <DialogActions>
            <Button onClick={() => setIsSignupOpen(false)} color="secondary">
              Cancel
            </Button>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              disabled={isLoading}
            >
              {isLoading ? "Signing Up..." : "Sign Up"}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}
