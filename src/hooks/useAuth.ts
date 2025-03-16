import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Config } from "../../config";

const api = axios.create({
  baseURL: Config.API_BASE_URL,
  withCredentials: true,
});

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
      console.log(data, "HERE data");
      localStorage.setItem("accessToken", data.token);
      api.defaults.headers.Authorization = `Bearer ${data.token}`;
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
    staleTime: 1000 * 60 * 5
  });
};

export const useRefreshToken = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await api.post("/auth/refresh");
      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
    onError: () => {
      queryClient.setQueryData(["auth"], null);
    },
  });
};
