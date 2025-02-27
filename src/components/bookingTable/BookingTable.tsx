
import { Button, Divider, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { fetchBookings, reserveSlot } from "../../services/BookingService";
import { BookingCounter } from "./BookingCounter";

const TIME_SLOTS = ['08:00-11:00', "11:00-14:00", "14:00-17:00", "17:00-20:00"];

export function BookingTable() {
    const today = dayjs();
    const weekDays = Array.from({ length: 7 }, (_, i) => today.add(i, "day").format("YYYY-MM-DD"))

    const queryClient = useQueryClient();
    const { data: bookings = [], isLoading, isError } = useQuery({
        queryKey: ["bookings"],
        queryFn: fetchBookings
    })

    const mutation = useMutation({
        mutationFn: ({ date, timeSlot }) => reserveSlot(date, timeSlot),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["bookings"] })
            console.log('Data', data)
        },
        onError: (error) => {
            console.log('Mutation failed', error)
        }
    })



    const isReserved = (date, timeSlot) => {
        return [].some((booking) => booking.date === date && booking.timeSlot === timeSlot)
    }
    return (<div>
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
                    {TIME_SLOTS.map((slot) => (
                        <TableRow key={slot}>
                            <TableCell>{slot}</TableCell>
                            {weekDays.map((day) => (
                                <TableCell key={day} align="center">
                                    {isReserved(day, slot) ? (<Typography color="info">Booked</Typography>) : (
                                        <Button variant="outlined" size="small" onClick={() => { }}>
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
    </div>)
}