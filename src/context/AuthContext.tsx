import { createContext } from "react";
import { AuthStateType } from "./AuthProvider";


export const AuthContext = createContext<AuthStateType | undefined>(undefined);