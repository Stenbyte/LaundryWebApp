import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, InferType } from "yup";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { Config } from "../../../config";
import { GenericButton } from "../Buttons/GenericButton";
import { useUIContext } from "../../context/UseUIContext";

const SubmitSchema = object().shape({
  firstName: string().required("First name is required"),
  lastName: string().required("Last name is required"),
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
  // phoneNumber: object({
  //   number: string()
  //     .matches(/^\d{8,15}$/, "Invalid phone number")
  //     .required("Phone is required"),
  //   countryCode: string()
  //     .matches(/^\+\d{1,4}$/, "Invalid country code")
  //     .required("Country Code is required"),
  // }),
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
  // phoneNumber: {
  //   number: "",
  //   countryCode: "",
  // },
  // password: "",
};

type SignUpType = InferType<typeof SubmitSchema>;

export function SignUp() {
  const { isSignUpOpen, dispatch, isLoading } = useUIContext();

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
        houseNumber: "",
      },
      // phoneNumber: {
      //   countryCode: "",
      //   number: "",
      // },
      email: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (formData: SignUpType) => {
      dispatch({ type: "SET_LOADING", payload: true });
      return axios.post(`${Config.API_BASE_URL}/api/signup`, formData);
    },
    onSuccess: () => {
      toast("Sign-up successful!");
      dispatch({ type: "SET_SIGNUP", payload: false });
      dispatch({ type: "SET_LOADING", payload: false });
      reset(defaultSignUpValues);
    },
    onError: (error) => {
      toast(`Sign-up failed: ${error?.message}`);
      dispatch({ type: "SET_LOADING", payload: false });
    },
  });

  const onSubmit = (data: SignUpType) => {
    mutation.mutate(data);
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="First Name"
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
                  label="Last Name"
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
                  label="House Number"
                  fullWidth
                  margin="normal"
                  error={!!errors.adress?.houseNumber}
                  helperText={errors.adress?.houseNumber?.message}
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
                className="cancelBtn"
              />
              <GenericButton
                type="submit"
                className="signUpSubmit"
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
