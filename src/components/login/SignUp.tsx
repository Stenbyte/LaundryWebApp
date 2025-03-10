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
import { ToastContainer, toast } from "react-toastify";
import { Config } from "../../../config";

interface SignUpProps {
  data: {
    isSignupOpen: boolean;
    setIsSignupOpen: (open: boolean) => void;
  };
}

const SubmitSchema = object().shape({
  firstName: string().required("First name is required"),
  lastName: string().required("Last name is required"),
  email: string()
    .email("Invalid email")
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
  phoneNumber: object({
    number: string()
      .matches(/^\d{8,15}$/, "Invalid phone number")
      .required("Phone is required"),
    countryCode: string()
      .matches(/^\+\d{1,4}$/, "Invalid country code")
      .required("Country Code is required"),
  }),
  adress: object({
    streetName: string()
      .min(5, "Address must be at least 5 characters")
      .required("Street name is required"),
    houseNumber: string()
      .matches(
        /^[1-9]\d*$/,
        "House number must be a positive number greater than zero"
      )
      .required("House number is required"),
  }),
});

const defaultSignUpValues: SignUpType = {
  firstName: "",
  lastName: "",
  email: "",
  adress: {
    streetName: "",
    houseNumber: "",
  },
  phoneNumber: {
    number: "",
    countryCode: "",
  },
  password: "",
};

type SignUpType = InferType<typeof SubmitSchema>;

export function SignUp({ data }: SignUpProps) {
  const { isSignupOpen, setIsSignupOpen } = data;
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(SubmitSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      password: "",
      adress: {
        streetName: "",
        houseNumber: "",
      },
      phoneNumber: {
        countryCode: "",
        number: "",
      },
      email: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (formData: SignUpType) => {
      setIsLoading(true);
      return axios.post(`${Config.API_BASE_URL}/signup`, formData);
    },
    onSuccess: () => {
      toast("Sign-up successful!");
      setIsSignupOpen(false);
      setIsLoading(false);
      reset(defaultSignUpValues);
    },
    onError: (error) => {
      toast("Sign-up failed.");
      setIsLoading(false);
      console.error(error);
    },
  });

  const onSubmit = (data: SignUpType) => {
    mutation.mutate(data);
  };

  return (
    <>
      <ToastContainer />
      <Dialog
        disableEnforceFocus
        open={isSignupOpen}
        onClose={() => {
          reset(defaultSignUpValues);
          setIsSignupOpen(false);
        }}
      >
        <DialogTitle>Sign Up</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="firstName"
                  fullWidth
                  margin="normal"
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                />
              )}
            />
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="lastName"
                  fullWidth
                  margin="normal"
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  fullWidth
                  margin="normal"
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
                  margin="normal"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              )}
            />
            <Controller
              name="phoneNumber.number"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="number"
                  fullWidth
                  margin="normal"
                  error={!!errors.phoneNumber?.number}
                  helperText={errors.phoneNumber?.number?.message}
                />
              )}
            />
            <Controller
              name="phoneNumber.countryCode"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="country code"
                  fullWidth
                  margin="normal"
                  error={!!errors.phoneNumber?.countryCode}
                  helperText={errors.phoneNumber?.countryCode?.message}
                />
              )}
            />
            <Controller
              name="adress.streetName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="street name"
                  fullWidth
                  margin="normal"
                  error={!!errors.adress?.streetName}
                  helperText={errors.adress?.streetName?.message}
                />
              )}
            />
            <Controller
              name="adress.houseNumber"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="house number"
                  fullWidth
                  margin="normal"
                  error={!!errors.adress?.houseNumber}
                  helperText={errors.adress?.houseNumber?.message}
                />
              )}
            />
            <DialogActions>
              <Button
                onClick={() => {
                  reset(defaultSignUpValues);
                  setIsSignupOpen(false);
                }}
                color="secondary"
              >
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
    </>
  );
}
