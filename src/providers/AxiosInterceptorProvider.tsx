import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { api, refreshTokenApi } from "../services/AxiosConfig";
import { useAuthContext } from "../context/UseAuthContext";
import { useQueryClient } from "@tanstack/react-query";
import LoadingCircle from "../components/loadingCircle/LoadingCircle";

let isRefreshing = false;
let refreshSubscribers: ((token: string | null) => void)[] = [];

const onRefreshed = (token: string | null) => {
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
  const tokenRef = useRef<string | null>(null);
  const queryClient = useQueryClient();

  tokenRef.current = accessToken;

  useLayoutEffect(() => {
    const authInterceptor = api.interceptors.request.use((config) => {
      if (tokenRef.current) {
        config.headers.Authorization = `Bearer ${tokenRef.current}`;
      }
      return config;
    });

    const refreshInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (!error.config) {
          return Promise.reject(error);
        }
        const originalRequest = error.config;
        if (
          error.response?.status === 401 &&
          !originalRequest._retry &&
          !originalRequest.url.includes("/auth/")
        ) {
          originalRequest._retry = true;

          if (isRefreshing) {
            return new Promise((resolve, reject) => {
              refreshSubscribers.push((token) => {
                if (!token) {
                  reject(error);
                  return;
                }
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
            tokenRef.current = newToken;
            onRefreshed(tokenRef.current);
            isRefreshing = false;
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return api(originalRequest);
          } catch (refreshError) {
            setAccessToken(null);
            tokenRef.current = null;
            isRefreshing = false;
            refreshSubscribers.forEach((cb) => cb(""));
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
  }, []);

  useEffect(() => {
    const initRefresh = async () => {
      if (refreshStarted.current) return;
      refreshStarted.current = true;
      try {
        const response = await refreshTokenApi.post(`/auth/refreshToken`, {});
        setAccessToken(response.data.accessToken);
        tokenRef.current = response.data.accessToken;
      } catch {
      } finally {
        setIsInitialized(true);
      }
    };

    if (!tokenRef.current) {
      initRefresh();
    } else {
      setIsInitialized(true);
    }
  }, []);

  if (!isInitialized) return <LoadingCircle />;

  return <>{children}</>;
};
