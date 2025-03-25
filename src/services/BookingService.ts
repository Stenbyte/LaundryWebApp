
import { Config } from "../../config";
import { Booking, BookingSlot } from "../components/bookingTable/BookingTable";
import api from '../services/AxiosConfig';

export const fetchBookings = async (): Promise<Booking[]> => {
  const { data } = await api.get(`${Config.API_BASE_URL}/booking/getAll`);
  return data;
};

export const reserveSlot = async (slot: BookingSlot) => {
  try {
  const { data } = await api.post(`${Config.API_BASE_URL}/booking/create`, {
    ...slot
  },
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
  return data;
  } catch (error) {
    if (error?.response?.data?.message === "You can not add new reservation") {
      throw new Error("You can not add new reservation")
    } else {
      throw new Error("Failed to reserve slot. Please try again")
    }
  }

};

export const editSlot = async (slot: BookingSlot) => {
  console.log('hre')
  try {
    const { data } = await api.post(`${Config.API_BASE_URL}/booking/edit`, {
      ...slot
    },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    return data;
  } catch (error) {
    if (error?.response?.data?.message === "You can not add new reservation") {
      throw new Error("You can not add new reservation")
    } else {
      throw new Error("Failed to remove slot.")
    }
  }

};
