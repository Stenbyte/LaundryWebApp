import { createContext } from "react";
import { UserData } from "../constants";

export const AuthContext = createContext<UserData | null>(null);
