import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { GenericButton } from "../Buttons/GenericButton";
import { useUIContext } from "../../context/UseUIContext";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Config } from "../../../config";
import {
  defaultSignUpValues,
  SignUpType,
  SubmitSchema,
} from "../../services/SignUpService";
import axios from "axios";
import { toast } from "react-toastify";

export function SignUp() {
  const { isSignUpOpen, dispatch } = useUIContext();
  const [isLoading, setLoading] = useState(false);

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
      // password: "",
      adress: {
        streetName: "",
        buildingNumber: "",
      },
      // phoneNumber: {
      //   countryCode: "",
      //   number: "",
      // },
      email: "",
    },
  });

  const mutate = useMutation({
    mutationFn: async (data: SignUpType) => {
      setLoading(true);
      return axios.post(`${Config.API_BASE_URL}/api/signup`, data);
    },
    onSuccess: () => {
      toast("Sign-up successful!");
      dispatch({ type: "SET_SIGNUP", payload: false });
      setLoading(false);
      reset(defaultSignUpValues);
    },
    onError: () => {
      setLoading(false);
      toast(`Something went wrong during sign-up`);
    },
  });
  const useSubmit = (data: SignUpType) => {
    mutate.mutateAsync(data);
  };

  return (
    <>
      <Dialog
        disableEnforceFocus
        open={isSignUpOpen}
        onClose={() => {
          reset(defaultSignUpValues);
          dispatch({ type: "SET_SIGNUP", payload: false });
        }}
      >
        <DialogTitle>Sign Up</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(useSubmit)}>
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="First Name"
                  fullWidth
                  margin="normal"
                  data-testid="first-name"
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
                  label="Last Name"
                  fullWidth
                  data-testid="last-name"
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
                  data-testid="signup-email"
                  margin="normal"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />
            {/* <Controller
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
            /> */}
            {/* <Controller
              name="phoneNumber.number"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Number"
                  fullWidth
                  margin="normal"
                  error={!!errors.phoneNumber?.number}
                  helperText={errors.phoneNumber?.number?.message}
                />
              )}
            /> */}
            {/* <Controller
              name="phoneNumber.countryCode"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Country code"
                  fullWidth
                  margin="normal"
                  error={!!errors.phoneNumber?.countryCode}
                  helperText={errors.phoneNumber?.countryCode?.message}
                />
              )}
            /> */}
            <Controller
              name="adress.streetName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Street Name"
                  fullWidth
                  data-testid="street-name"
                  margin="normal"
                  error={!!errors.adress?.streetName}
                  helperText={errors.adress?.streetName?.message}
                />
              )}
            />
            <Controller
              name="adress.buildingNumber"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="House Number"
                  fullWidth
                  data-testid="house-number"
                  margin="normal"
                  error={!!errors.adress?.buildingNumber}
                  helperText={errors.adress?.buildingNumber?.message}
                />
              )}
            />
            <DialogActions>
              <GenericButton
                onClick={() => {
                  reset(defaultSignUpValues);
                  dispatch({ type: "SET_SIGNUP", payload: false });
                }}
                children="Cancel"
                testid="signup-cancel-btn"
                className="cancelBtn"
              />
              <GenericButton
                type="submit"
                className="signUpSubmit"
                testid="signup-submit"
                disabled={isLoading}
                children={isLoading ? "Signing Up..." : "Sign Up"}
              />
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
