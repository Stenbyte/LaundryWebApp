import { useContext } from "react";
import { GlobalContext } from "./GlobalContext";
import { GlobalStateType } from "./ContextProvider";

export const useGlobalContext = (): GlobalStateType => {
  const context = useContext(GlobalContext);
  if (!context) throw new Error("Context must be used inside Provider");

  return context;
};
