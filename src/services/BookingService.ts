import axios from "axios";

const API_BASE_URL = "http://localhost:5063/api";

export const fetchBookings = async () => {
  const { data } = await axios.get(`${API_BASE_URL}/bookings`);
  return data;
};

export const reserveSlot = async (date, timeSlot) => {
  const { data } = await axios.post(`${API_BASE_URL}/bookings`, {
    date,
    timeSlot,
  });
  return data;
};
