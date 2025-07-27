import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { UserData } from "../hooks/auhtHooks";

export const useAuthContext = (): UserData | null => {
  const context = useContext(AuthContext);

  return context;
};
