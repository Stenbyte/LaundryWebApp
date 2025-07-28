import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { UserData } from "../constants";


export const useAuthContext = (): UserData | null => {
  const context = useContext(AuthContext);

  return context;
};
