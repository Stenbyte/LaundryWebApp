import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { UserData } from "../constants";
import { UseQueryResult } from "@tanstack/react-query";

export const useAuthContext = (): UseQueryResult<UserData | null> => {
  const context = useContext(AuthContext);

  return context;
};
