import { useContext } from "react";
import { UiContext } from "./UiContext";
import { UiStateType } from "../providers/UiProvider";


export const useUIContext = (): UiStateType => {
  const context = useContext(UiContext);
  if (!context) throw new Error("Context must be used inside Provider");

  return context;
};
