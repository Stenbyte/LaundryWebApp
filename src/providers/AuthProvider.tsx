import { ReactNode, useMemo, useState } from "react";
import { useAuth } from "../hooks/auhtHooks";
import { AuthContext } from "../context/AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const { data, isLoading } = useAuth(!!accessToken);

  const value = useMemo(
    () => ({
      user: data ?? null,
      accessToken,
      setAccessToken,
      isLoading,
    }),
    [data, accessToken, isLoading]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
