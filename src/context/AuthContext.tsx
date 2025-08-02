import { createContext } from "react";
import { UserData } from "../constants";
import { UseQueryResult } from "@tanstack/react-query";

export const AuthContext = createContext<UseQueryResult<UserData | null>>(
  {} as UseQueryResult<UserData | null>
);
