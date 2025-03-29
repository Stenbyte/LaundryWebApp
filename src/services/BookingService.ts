
import { Config } from "../../config";
import { Booking, BookingSlot, EditSlotId } from "../components/bookingTable/BookingTable";
import api from '../services/AxiosConfig';

export const fetchBookings = async (): Promise<Booking[]> => {
  const { data } = await api.get(`${Config.API_BASE_URL}/booking/getAll`);
  return data;
};

export const reserveSlot = async (args: BookingSlot | EditSlotId) => {
  try {
  const { data } = await api.post(`${Config.API_BASE_URL}/booking/create`, {
    ...args
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

export const editSlot = async (args: BookingSlot | EditSlotId) => { 
  try {
    const { data } = await api.post(`${Config.API_BASE_URL}/booking/edit`, {
      ...args
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
