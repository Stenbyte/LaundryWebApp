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
import { fetchBookings, reserveSlot } from "../../services/BookingService";
import { BookingCounter } from "./BookingCounter";
import { toast, ToastContainer } from "react-toastify";

const TIME_SLOTS = ["08:00-11:00", "11:00-14:00", "14:00-17:00", "17:00-20:00"];
dayjs.extend(utc);
dayjs.extend(timezone);
export interface BookingSlot {
  day: string;
  timeSlots: string[];
  booked?: boolean;
}
export interface Booking {
  userId: string;
  machineId: string;
  slots: BookingSlot[];
  reservationsLeft: number;
}

export function BookingTable() {
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

  const mutation = useMutation({
    mutationFn: (slot: BookingSlot) => reserveSlot(slot),
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

  const reserve = async (slot: BookingSlot) => {
    try {
      await mutation.mutateAsync(slot);
      toast.success("Booking successful!");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      /* empty */
    }
  };

  const isReserved = (day: string, time: string) => {
    return (
      bookings?.some((booking) =>
        booking.slots.some(
          (b) =>
            dayjs(b.day).format("YYYY-MM-DD") ===
              dayjs(day).format("YYYY-MM-DD") &&
            b.timeSlots.includes(time) &&
            b.booked === true
        )
      ) ?? false
    );
  };

  if (isLoading) {
    // toast("Fetching reservations");
    return <>Loading....</>;
  }
  return (
    <div>
      <ToastContainer />
      <BookingCounter />
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
                {weekDays.map((day) => (
                  <TableCell key={day} align="center">
                    {isTimeSlotInPast(day, timeSlots) ? (
                      <Typography color="textSecondary">Expired</Typography>
                    ) : isReserved(day, timeSlots) ? (
                      <Typography color="info">Booked</Typography>
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
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
