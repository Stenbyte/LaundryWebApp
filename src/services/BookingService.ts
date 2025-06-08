
import { AxiosError } from "axios";
import { Config } from "../../config";
import { Booking, BookingSlot, EditSlotId } from "../components/bookingTable/BookingTable";
import api from '../services/AxiosConfig';
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";


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

export const reserveSlot = async (args: BookingSlot | EditSlotId) => {
  try {
    const { data } = await api.post(`${Config.API_BASE_URL}/api/booking/create`, {
      ...args
    },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    return data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.message;
      if (errorMessage === "You can not add new reservation") {
        throw new Error("You can not add new reservation");
      }
    } else {
      throw new Error("Failed to reserve slot. Please try again");
    }

  }
};

export const editSlot = async (args: BookingSlot | EditSlotId) => {
  try {
    const { data } = await api.post(`${Config.API_BASE_URL}/api/booking/edit`, {
      ...args
    },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    return data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.message;

      if (errorMessage === "You can not add new reservation") {
        throw new Error("You can not add new reservation")
      }
    }
    throw new Error("Failed to remove slot.")
  }
};

export const cancelAllBookings = async () => {
  try {
    const { data } = await api.post(`${Config.API_BASE_URL}/api/booking/cancel`,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.message;
      if (errorMessage === "You can not add new reservation") {
        throw new Error("You can not add new reservation")
      }
    }
    throw new Error("Failed to remove slot.")
  }
};

export const isTimeSlotInPast = (selectedDateUtc: string, timeSlot: string) => {
  const nowLocal = dayjs();
  const todayLocal = nowLocal.startOf("day");

  const [, end] = timeSlot.split("-");
  const [endHour, endMinute] = end.split(":").map(Number);

  const slotDateLocal = dayjs.utc(selectedDateUtc).local().startOf("day");

  const slotEndLocal = slotDateLocal
    .hour(endHour)
    .minute(endMinute)
    .second(0);

  return (
    slotDateLocal.isBefore(todayLocal) ||
    (slotDateLocal.isSame(todayLocal) && slotEndLocal.isBefore(nowLocal))
  );
};