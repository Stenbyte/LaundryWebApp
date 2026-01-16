import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { api, refreshTokenApi } from "../services/AxiosConfig";
import { useAuthContext } from "../context/UseAuthContext";
import { Config } from "../../config";
import type { InternalAxiosRequestConfig } from "axios";

declare module "axios" {
  interface InternalAxiosRequestConfig {
    _retry?: boolean;
  }
}

export const AxiosInterceptorProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { accessToken, setAccessToken } = useAuthContext();
  const [isInitialized, setIsInitialized] = useState(false);
  const refreshStarted = useRef(false);

  useLayoutEffect(() => {
    const authInterceptor = api.interceptors.request.use((config) => {
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    });

    const refreshInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            // This call sends the Refresh Cookie automatically
            const response = await refreshTokenApi.post(
              `/auth/refreshToken`,
              {}
            );
            const newToken = response.data.accessToken;

            setAccessToken(newToken);
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return api(originalRequest);
          } catch (refreshError) {
            setAccessToken(null);
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(authInterceptor);
      api.interceptors.response.eject(refreshInterceptor);
    };
  }, [accessToken, setAccessToken]);

  useEffect(() => {
    const initRefresh = async () => {
      if (refreshStarted.current) return;
      refreshStarted.current = true;
      try {
        const response = await refreshTokenApi.post(`/auth/refreshToken`, {});
        setAccessToken(response.data.accessToken);
      } catch (err) {
        console.warn(
          "No active session found (Refresh Cookie missing or expired)"
        );
      } finally {
        setIsInitialized(true);
      }
    };

    if (!accessToken) {
      initRefresh();
    } else {
      setIsInitialized(true);
    }
  }, []);

  if (!isInitialized) return null; // Or a loading spinner

  return <>{children}</>;
};
