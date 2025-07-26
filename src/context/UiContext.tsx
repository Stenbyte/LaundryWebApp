import { createContext } from "react";
import { UiStateType } from "../providers/UiProvider";


export const UiContext = createContext<UiStateType | undefined>(undefined);