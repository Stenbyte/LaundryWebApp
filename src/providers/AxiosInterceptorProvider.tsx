import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { api, refreshTokenApi } from "../services/AxiosConfig";
import { useAuthContext } from "../context/UseAuthContext";
import { useQueryClient } from "@tanstack/react-query";
import LoadingCircle from "../components/loadingCircle/LoadingCircle";

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const onRefreshed = (token: string) => {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
};

export const AxiosInterceptorProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { accessToken, setAccessToken } = useAuthContext();
  const [isInitialized, setIsInitialized] = useState(false);
  const refreshStarted = useRef(false);
  const queryClient = useQueryClient();

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

          if (isRefreshing) {
            return new Promise((resolve) => {
              refreshSubscribers.push((token) => {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                resolve(api(originalRequest));
              });
            });
          }
          isRefreshing = true;

          try {
            const response = await refreshTokenApi.post(
              `/auth/refreshToken`,
              {},
            );
            const newToken = response.data.accessToken;

            setAccessToken(newToken);
            onRefreshed(newToken);
            isRefreshing = false;
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return api(originalRequest);
          } catch (refreshError) {
            setAccessToken(null);
            isRefreshing = false;
            refreshSubscribers = [];
            sessionStorage.clear();
            queryClient.setQueryData(["auth"], null);
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      },
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
      } catch {
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

  if (!isInitialized) return <LoadingCircle />;

  return <>{children}</>;
};
