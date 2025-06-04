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
  useFetchBookings,
} from "../../services/BookingService";
import { BookingHeader } from "./BookingHeader";
import { toast } from "react-toastify";
import { useUIContext } from "../../context/UseUIContext";
import { useAuth } from "../../hooks/useAuth";

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
  const { disabledBtn, dispatch } = useUIContext();
  const { data: user } = useAuth();

  if (!user?.userId) {
    return null;
  }

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

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const queryClient = useQueryClient();

  // const {
  //   data: bookings,
  //   isLoading,
  //   isError,
  // } = useQuery({
  //   queryKey: ["bookings"],
  //   queryFn: fetchBookings,
  //   retry: 0,
  //   enabled: !!user?.userId,
  // });

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: bookings, isLoading, isError } = useFetchBookings(user!.userId);

  if (isError) {
    toast(`Failed to fetch reservations`);
  }

  const mutationFunction = (args: BookingSlot) => {
    return reserveSlot(args);
  };
  const editMutationFunction = (args: EditSlotId) => {
    return editSlot(args);
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const mutation = useMutation({
    mutationFn: mutationFunction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      dispatch({ type: "SET_DISABLED_BTN", payload: true });
    },
    onError: (error) => {
      if (error.message === "You can not add new reservation") {
        toast.error(error.message);
      } else {
        toast.error(error.message);
      }
    },
  });
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const editMutation = useMutation({
    mutationFn: editMutationFunction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: (error) => {
      if (error.message === "You can not edit reservation") {
        toast.error(error.message);
      } else {
        toast.error(error.message);
      }
    },
  });

  const reserve = async (args: BookingSlot) => {
    await mutation.mutateAsync(args);
    toast.success("Booking successful!");
  };

  const edit = async (args: EditSlotId) => {
    try {
      await editMutation.mutateAsync(args);
      toast.success("Edit successful!");
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  const getReservedSlotData = (day: string, time: string) => {
    for (const booking of bookings || []) {
      for (const slot of booking.slots) {
        if (
          dayjs(slot.day).format("YYYY-MM-DD") ===
            dayjs(day).format("YYYY-MM-DD") &&
          slot.timeSlots.includes(time) &&
          slot.booked
        ) {
          return {
            isBooked: slot.booked,
            slotId: slot.id,
            bookingUserId: booking.userId,
          };
        }
      }
    }
    return { isBooked: false, slotId: undefined, bookingUserId: undefined };
  };
  if (!user?.userId) {
    return null;
  }

  if (isLoading) {
    return <>Loading....</>;
  }
  return (
    <div className="bookingTable" data-testid="booking-skeleton">
      <BookingHeader
        data={{
          bookings,
        }}
      />
      <Divider />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="tableBorders">Time Slot</TableCell>
              {weekDays.map((day) => (
                <TableCell key={day} align="center" className="tableBorders">
                  {dayjs(day).format("D ddd, MMM")}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {TIME_SLOTS.map((timeSlots) => (
              <TableRow key={timeSlots}>
                <TableCell className="tableBorders">{timeSlots}</TableCell>
                {weekDays.map((day) => {
                  const { isBooked, slotId, bookingUserId } =
                    getReservedSlotData(day, timeSlots);
                  return (
                    <TableCell
                      key={day}
                      align="center"
                      className="tableBorders"
                    >
                      {isTimeSlotInPast(day, timeSlots) ? (
                        <Typography className="expiredSlot">Expired</Typography>
                      ) : isBooked ? (
                        <Button
                          className={`${
                            bookingUserId?.toString() !== user.userId.toString()
                              ? "bookedSlot"
                              : !disabledBtn
                              ? "bookedEditSlot"
                              : "bookedUserSlot"
                          }`}
                          disabled={
                            bookingUserId?.toString() === user.userId.toString()
                              ? disabledBtn
                              : true
                          }
                          key={slotId}
                          onClick={() => {
                            edit({ id: slotId });
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
