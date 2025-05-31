import { createContext } from "react";
import { UiStateType } from "./UiProvider";

export const UiContext = createContext<UiStateType | undefined>(undefined);