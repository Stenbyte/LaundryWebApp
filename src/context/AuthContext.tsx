import { createContext } from "react";
import { UserData } from "../constants";

export type AuthContextType = {
  user: UserData | null;
  accessToken: string | null;
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
  isLoading: boolean;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);
