import { object, string, InferType } from "yup";


export const SubmitSchema = object().shape({
    firstName: string().required("First name is required"),
    lastName: string().required("Last name is required"),
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
        buildingNumber: string()
            .matches(
                /^[1-9]\d*$/,
                "House number must be a positive number greater than zero"
            )
            .required("House number is required"),
    }),
});

export const defaultSignUpValues: SignUpType = {
    firstName: "",
    lastName: "",
    email: "",
    adress: {
        streetName: "",
        buildingNumber: "",
    },
    // phoneNumber: {
    //   number: "",
    //   countryCode: "",
    // },
    password: ""
};

export type SignUpType = InferType<typeof SubmitSchema>;

