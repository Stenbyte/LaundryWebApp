import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { AuthStateType } from "./AuthProvider";



export const useAuthContext = (): AuthStateType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("Context must be used inside Provider");

  return context;
};
