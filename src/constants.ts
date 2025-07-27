import { InferType } from "yup";
import { LoginSchema } from "./components/login/Login";

export type LoginPayload = {
  email: string;
  // password: string;
}
export interface UserData {
  email: string,
  userId: string
}
export type LogOutPayload = LoginPayload & {
  userId: string
};
export interface LogOutResponse {
  message: string;
}
export interface LoginResponse {
  token: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
}

export type MetaDataType = {
  notifications: string[];
};

export type LoginType = InferType<typeof LoginSchema>;

export interface BookingSlot {
  day: string;
  timeSlots: string[];
  booked?: boolean;
  id?: string;
}
export interface Booking {
  userId: string;
  machineId: string;
  slots: BookingSlot[];
  reservationsLeft: number;
  id?: string;
}
export interface EditSlotId {
  id: string | undefined;
}

export const TIME_SLOTS = ["08:00-11:00", "11:00-14:00", "14:00-17:00", "17:00-20:00"];