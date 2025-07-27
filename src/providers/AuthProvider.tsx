import { ReactNode, useMemo } from "react";
import { useAuth } from "../hooks/auhtHooks";
import { AuthContext } from "../context/AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data: user } = useAuth();
  const value = useMemo(() => user ?? null, [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
