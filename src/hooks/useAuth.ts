import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import api from "../services/AxiosConfig";

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

const loginUser = async (payload: LoginPayload): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("/auth/login", payload);
  return response.data;
};
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation<LoginResponse, Error, LoginPayload>({
    mutationFn: loginUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      sessionStorage.setItem("access_token", data.token);
    },
  });
};

export const useAuth = () => {
  return useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      const response = await api.get("/auth/userInfo");
      return response.data;
    },
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
};

interface RefreshTokenResponse {
  accessToken: string;
}

export const useRefreshToken = () => {
  const queryClient = useQueryClient();

  return useMutation<RefreshTokenResponse, Error>({
    mutationFn: async (): Promise<RefreshTokenResponse> => {
      const response = await api.post<RefreshTokenResponse>("/auth/refresh");
      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
    onError: (err) => {
      queryClient.setQueryData(["auth"], null);
      return Promise.reject(err);
    },
  });
};
