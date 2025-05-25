import { useContext } from "react";
import { GlobalContext } from "./GlobalContext";
import { GlobalStatType } from "./ContextProvider";

export const useGlobalContext = (): GlobalStatType => {
  const context = useContext(GlobalContext);
  if (!context) throw new Error("Context must be used inside Provider");

  return context;
};
