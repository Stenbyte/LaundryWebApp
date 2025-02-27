import axios from "axios";
import { Config } from "../../config";

export const fetchBookings = async () => {
  const { data } = await axios.get(`${Config.API_BASE_URL}/bookings`);
  return data;
};

export const reserveSlot = async (date, timeSlot) => {
  const { data } = await axios.post(`${Config.API_BASE_URL}/bookings`, {
    date,
    timeSlot,
  });
  return data;
};
