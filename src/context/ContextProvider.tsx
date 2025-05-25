import { useState, ReactNode } from "react";
import { GlobalContext } from "./GlobalContext";

export type GlobalStatType = {
  isLogedIn: boolean;
  setIsLogedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [isLogedIn, setIsLogedIn] = useState(false);

  const value = {
    isLogedIn,
    setIsLogedIn,
  };
  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};
