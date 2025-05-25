import { createContext } from "react";
import { GlobalStateType } from "./ContextProvider";

export const GlobalContext = createContext<GlobalStateType | undefined>(
  undefined
);