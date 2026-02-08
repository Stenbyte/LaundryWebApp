import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { api } from "../services/AxiosConfig";
import { LoginPayload, LoginResponse, LogOutResponse, UserData } from "../constants";
import { useAuthContext } from "../context/UseAuthContext";



const loginUser = async (payload: LoginPayload): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("/auth/login", payload);
  return response.data;
};

const logOutUser = async (data: UserData): Promise<LogOutResponse> => {
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
  const { setAccessToken } = useAuthContext();


  return useMutation<LoginResponse, Error, LoginPayload>({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setAccessToken(data.token)
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    }
  });
};

export const useLogOut = () => {
  const queryClient = useQueryClient();
  const { setAccessToken } = useAuthContext();

  return useMutation<LogOutResponse, Error, UserData>({
    mutationFn: logOutUser,
    onSettled: () => {
      sessionStorage.clear()
      setAccessToken(null)
      queryClient.setQueryData(["auth"], null);
      queryClient.clear();
    },
  });
}

export const useAuth = (enabled: boolean) => {
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
    enabled: enabled,
    staleTime: 1000 * 60 * 5
  });
};
