// / <reference types="react" />
import { Box, Tooltip, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { TradeBtn } from "../Buttons/Trade";
import { EditBtn } from "../Buttons/Edit";
import { CancelBtn } from "../Buttons/Cancel";
import { ReportBtn } from "../Buttons/Report";
import "../../App.css";
import { Booking } from "./BookingTable";
import { useAuth } from "../../hooks/useAuth";

export function BookingHeader({
  data,
}: {
  data: {
    bookings: Booking[] | undefined;
  };
}) {
  const { data: user } = useAuth();
  const reservationCount = data.bookings?.find(
    (booking) => booking.userId === user?.userId
  )?.reservationsLeft;

  const disabledBtnIfNoBookings =
    data.bookings?.some((booking) =>
      booking.slots.some((slot) => slot.booked === true)
    ) ?? false;

  return (
    <Box className="booking-counter-mainBox">
      <Box className="booking-counter-resesrvation">
        <Tooltip
          title="Number of reservations that can be used per week"
          className="infoIcon"
          placement="top-start"
        >
          <InfoIcon />
        </Tooltip>
        <Typography>Reservations left: {reservationCount}</Typography>
      </Box>
      <Box className="booking-counter-edit-cancel-btn">
        <EditBtn disabledBtnIfNoBookings={disabledBtnIfNoBookings} />
        <CancelBtn disabledBtnIfNoBookings={disabledBtnIfNoBookings} />
        <ReportBtn />
      </Box>
      <TradeBtn />
    </Box>
  );
}
