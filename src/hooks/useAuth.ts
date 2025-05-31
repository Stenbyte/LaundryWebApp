import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import api from "../services/AxiosConfig";

interface LoginPayload {
  email: string;
  // password: string;
}
export interface UserData {
  email: string,
  userId: string
}
type LogOutPayload = LoginPayload & {
  userId: string
};
interface LogOutResponse {
  message: string;
}
interface LoginResponse {
  token: string;
}

const loginUser = async (payload: LoginPayload): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("/auth/login", payload);
  return response.data;
};

const logOutUser = async (data: LogOutPayload): Promise<LogOutResponse> => {
  const email = data.email;
  const response = await api.post<LogOutResponse>("/auth/logout", {
    email
  }, {
    headers: {
      "Content-Type": "application/json"
    }
  });
  return response.data;
}
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation<LoginResponse, Error, LoginPayload>({
    mutationFn: loginUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      sessionStorage.setItem("access_token", data.token);
    }
  });
};

export const useLogOut = () => {
  const queryClient = useQueryClient();

  return useMutation<LogOutResponse, Error, LogOutPayload>({
    mutationFn: logOutUser,
    onSuccess: () => {
      sessionStorage.clear()
      queryClient.setQueryData(["auth"], null);
    },
  });
}

export const useAuth = () => {
  return useQuery({
    queryKey: ["auth"],
    queryFn: async (): Promise<UserData> => {
      try {
        const response = await api.get("/auth/userInfo");
        return response.data;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        throw new Error("User is not authenticated. Please log in");
      }
    },
    retry: 0,
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
