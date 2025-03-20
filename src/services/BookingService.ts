
import { Config } from "../../config";
import { ReserveSlot } from "../components/bookingTable/BookingTable";
import api from '../services/AxiosConfig';

export const fetchBookings = async () => {
  const { data } = await api.get(`${Config.API_BASE_URL}/bookings`);
  return data;
};

export const reserveSlot = async ({ day, time }: ReserveSlot) => {
  const { data } = await api.post(`${Config.API_BASE_URL}/bookings`, {
    day,
    time,
  });
  return data;
};
