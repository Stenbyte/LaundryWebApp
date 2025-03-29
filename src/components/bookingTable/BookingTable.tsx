import {
  Button,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import {
  editSlot,
  fetchBookings,
  reserveSlot,
} from "../../services/BookingService";
import { BookingHeader } from "./BookingHeader";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";

const TIME_SLOTS = ["08:00-11:00", "11:00-14:00", "14:00-17:00", "17:00-20:00"];
dayjs.extend(utc);
dayjs.extend(timezone);
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

export function BookingTable() {
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [isEditSlot, setIsEditSlot] = useState(false);
  const today = dayjs();
  const weekDays = Array.from({ length: 7 }, (_, i) =>
    today.add(i, "day").toISOString()
  );

  const isTimeSlotInPast = (selectedDateUtc: string, timeSlot: string) => {
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

  const queryClient = useQueryClient();

  const {
    data: bookings,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: fetchBookings,
    retry: 0,
  });

  if (isError) {
    toast("Failed to fetch reservations");
  }

  const mutationFunction = (args: BookingSlot | EditSlotId) => {
    return isEditSlot ? editSlot(args) : reserveSlot(args);
  };

  const mutation = useMutation({
    mutationFn: mutationFunction,
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
  });

  const reserve = async (args: BookingSlot | EditSlotId) => {
    try {
      await mutation.mutateAsync(args);
      toast.success(
        `${isEditSlot ? "Edit successful!" : "Booking successful!"}`
      );
      if (!isEditSlot) {
        setDisabledBtn(true);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      /* empty */
    }
  };

  const getReservedSlot = (day: string, time: string) => {
    for (const booking of bookings || []) {
      for (const slot of booking.slots) {
        if (
          dayjs(slot.day).format("YYYY-MM-DD") ===
            dayjs(day).format("YYYY-MM-DD") &&
          slot.timeSlots.includes(time) &&
          slot.booked
        ) {
          return { isBooked: slot.booked, slotId: slot.id };
        }
      }
    }
    return { isBooked: false, slotId: undefined };
  };

  if (isLoading) {
    return <>Loading....</>;
  }
  return (
    <div className="bookingTable">
      <ToastContainer />
      <BookingHeader
        data={{ setDisabledBtn, setIsEditSlot, isEditSlot, bookings }}
      />
      <Divider />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Time Slot</TableCell>
              {weekDays.map((day) => (
                <TableCell key={day} align="center">
                  {dayjs(day).format("D ddd, MMM")}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {TIME_SLOTS.map((timeSlots) => (
              <TableRow key={timeSlots}>
                <TableCell>{timeSlots}</TableCell>
                {weekDays.map((day) => {
                  const { isBooked, slotId } = getReservedSlot(day, timeSlots);
                  return (
                    <TableCell key={day} align="center">
                      {isTimeSlotInPast(day, timeSlots) ? (
                        <Typography className="expiredSlot">Expired</Typography>
                      ) : isBooked ? (
                        <Button
                          className={`${
                            disabledBtn ? "bookedSlot" : "bookedEditSlot"
                          }`}
                          disabled={disabledBtn}
                          onClick={() => {
                            reserve({ id: slotId });
                          }}
                        >
                          Booked
                        </Button>
                      ) : (
                        <Button
                          className="reserveBtn"
                          size="small"
                          onClick={() => {
                            reserve({ day, timeSlots: [timeSlots] });
                          }}
                        >
                          Reserve
                        </Button>
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
