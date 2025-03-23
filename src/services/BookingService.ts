
import { Config } from "../../config";
import { Booking, BookingSlot } from "../components/bookingTable/BookingTable";
import api from '../services/AxiosConfig';

export const fetchBookings = async (): Promise<Booking[]> => {
  const { data } = await api.get(`${Config.API_BASE_URL}/booking/getAll`);
  return data;
};

export const reserveSlot = async (slot: BookingSlot) => {

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
};
