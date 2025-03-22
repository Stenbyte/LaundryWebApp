
import { Button, Divider, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { fetchBookings, reserveSlot } from "../../services/BookingService";
import { BookingCounter } from "./BookingCounter";
import { toast, ToastContainer } from "react-toastify";

const TIME_SLOTS = ["08:00-11:00", "11:00-14:00", "14:00-17:00", "17:00-20:00"];

export interface BookingSlot {
  day: string;
  timeSlots: string[];
}

export function BookingTable() {
  const today = dayjs();
  const weekDays = Array.from({ length: 7 }, (_, i) =>
    today.add(i, "day").format("YYYY-MM-DD")
  );

  const queryClient = useQueryClient();

  const {
    data: bookings = [],
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
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      console.log("Data", data);
    },
    onError: (error) => {
      console.log("Mutation failed", error);
    },
  });

  const reserve = async (slot: BookingSlot) => {
    try {
      await mutation.mutateAsync(slot);
    } catch (error) {
      throw new Error(error as string);
    }
  };

  const isReserved = () => {
    return false;
    // return bookings.some(
    //   (booking: BookingSlot) => booking.day === day && booking.time === time
    // );
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
                    {isReserved() ? (
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