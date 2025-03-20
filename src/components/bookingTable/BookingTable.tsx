
import { Button, Divider, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { fetchBookings, reserveSlot } from "../../services/BookingService";
import { BookingCounter } from "./BookingCounter";
import { toast, ToastContainer } from "react-toastify";

const TIME_SLOTS = ["08:00-11:00", "11:00-14:00", "14:00-17:00", "17:00-20:00"];

export interface ReserveSlot {
  day: string;
  time: string;
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

  // need to check this loading
  if (isLoading) {
    toast("Fetching reservations");
  }
  //   if (isError) {
  //     // toast("Failed to fetch reservations");
  //   }

  const mutation = useMutation({
    mutationFn: ({ day, time }: ReserveSlot) => reserveSlot({ day, time }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      console.log("Data", data);
    },
    onError: (error) => {
      console.log("Mutation failed", error);
    },
  });

  const isReserved = ({ day, time }: ReserveSlot) => {
    return bookings.some(
      (booking: ReserveSlot) => booking.day === day && booking.time === time
    );
  };
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
            {TIME_SLOTS.map((time) => (
              <TableRow key={time}>
                <TableCell>{time}</TableCell>
                {weekDays.map((day) => (
                  <TableCell key={day} align="center">
                    {isReserved({ day, time }) ? (
                      <Typography color="info">Booked</Typography>
                    ) : (
                      <Button
                        className="reserveBtn"
                        size="small"
                        onClick={() => {
                          console.log("Reserving:", { day, time });
                          mutation.mutate({ day, time } as ReserveSlot);
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