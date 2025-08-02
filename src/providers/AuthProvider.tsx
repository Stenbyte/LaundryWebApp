import { ReactNode, useMemo } from "react";
import { useAuth } from "../hooks/auhtHooks";
import { AuthContext } from "../context/AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const data = useAuth();
  const value = useMemo(() => data ?? null, [data]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
