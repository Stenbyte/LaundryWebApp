
import axios from "axios";

import {
  QueryClient,
  UseMutationResult,
} from "@tanstack/react-query";
import { Config } from "../../config";

const api = axios.create({
  baseURL: Config.API_BASE_URL,
  withCredentials: true,
});

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const subscribeTokenRefresh = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback);
};

const onRefreshed = (token: string) => {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
};

api.interceptors.request.use((config) => {
  const accessToken = sessionStorage.getItem("access_token");
  if (accessToken && config.headers) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export const setupAxiosInterceptors = (
  queryClient: QueryClient,
  refreshMutation: UseMutationResult<{ accessToken: string }, Error, void>
) => {
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest?._retry) {
        originalRequest._retry = true;
        if (isRefreshing) {
          return new Promise((resolve) => {
            subscribeTokenRefresh((token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(api(originalRequest));
            });
          });
        }

        isRefreshing = true;

        try {
          const response = await refreshMutation.mutateAsync();
          const accessToken = response.accessToken;
          sessionStorage.setItem("access_token", accessToken);
          api.defaults.headers.Authorization = `Bearer ${accessToken}`;
          onRefreshed(accessToken);
          isRefreshing = false;
          return api(originalRequest);
        } catch (refreshError) {
          queryClient.setQueryData(["auth"], null);
          isRefreshing = false;
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );
};

export default api;
