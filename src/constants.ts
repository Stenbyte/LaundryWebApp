import { InferType } from "yup";
import { LoginSchema } from "./components/login/Login";

export type LoginPayload = {
    email: string;
    password: string;
}
export interface UserData {
    email: string,
    userId: string
}
export interface LogOutResponse {
    message: string;
}
export interface LoginResponse {
    token: string;
}

export interface RefreshTokenResponse {
    accessToken: string;
}

export type LoginType = InferType<typeof LoginSchema>;

export interface BookingSlot {
    _id?: string;
    day: string;
    timeSlots: string[];
    booked?: boolean;
    selectedMachinesIds: Pick<Machine, "_id">[]
}
export interface Booking {
    userId: string;
    machineId: string;
    slots: BookingSlot[];
    reservationsLeft: number;
    _id?: string;
}
export interface EditSlotId {
    _id: string | undefined;
}

export const TIME_SLOTS = ["08:00-11:00", "11:00-14:00", "14:00-17:00", "17:00-20:00"];

export interface Machine {
    _id: string;
    name: MachineNameEnum;
    status: MachineStatusEnum;
    buildingId: string;
}


export enum MachineNameEnum {
    washing = 'washing',
    dryer = 'dryer'
}

export enum MachineStatusEnum {
    available = 'available',
    maintenance = 'maintenance'
}
