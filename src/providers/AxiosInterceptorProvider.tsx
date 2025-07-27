import { useQueryClient } from "@tanstack/react-query";
import { useRefreshToken } from "../hooks/auhtHooks";
import { useEffect } from "react";
import { setupAxiosInterceptors } from "../services/AxiosConfig";

export const AxiosInterceptorProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const refreshToken = useRefreshToken();
  const queryClient = useQueryClient();

  useEffect(() => {
    setupAxiosInterceptors(queryClient, refreshToken);
  }, [refreshToken, queryClient]);

  return <>{children}</>;
};
