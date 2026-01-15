import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { cancelAllBookings } from "../services/BookingService";
import { Booking } from "../constants";
import { api } from "../services/AxiosConfig";
import { Config } from "../../config";
import { AxiosError } from "axios";

export const useCancel = () => {
  const queryClient = useQueryClient();

  return useMutation<{ data: unknown }, Error>({
    mutationFn: cancelAllBookings,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: (error) => {
      if (error.message === "You can not add new reservation") {
        toast.error(error.message);
      } else {
        toast.error(error.message);
      }
    },
  })
};

export const useFetchBookings = (userId?: string) => {
  return useQuery({
    queryKey: ["bookings"],
    queryFn: async (): Promise<Booking[]> => {
      try {
        const data = await api.get(`${Config.API_BASE_URL}/api/booking/getAll`);
        return data.data as Booking[];


      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          throw new Error(`Failed to fetch: ${error.message}`)
        }
        throw new Error("Failed to fetch bookings data");
      }
    },
    retry: 0,
    enabled: !!userId,
  });
};