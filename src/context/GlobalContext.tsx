import { createContext } from "react";
import { GlobalStatType } from "./ContextProvider";

export const GlobalContext = createContext<GlobalStatType | undefined>(undefined);