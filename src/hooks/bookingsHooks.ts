import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { cancelAllBookings } from "../services/BookingService";
import { Booking } from "../constants";
import api from "../services/AxiosConfig";
import { Config } from "../../config";

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
        const { data } = await api.get(`${Config.API_BASE_URL}/api/booking/getAll`);
        return data;

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        throw new Error("Failed to fetch bookings data");
      }
    },
    retry: 0,
    enabled: !!userId,
  });
};